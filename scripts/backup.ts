import { CronJob } from 'cron';
import { exec } from 'child_process';
import { S3 } from 'aws-sdk';
import { promisify } from 'util';
import { validateEnv } from '../config/env.config';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);
const env = validateEnv();

export class BackupService {
  private s3: S3;
  private backupJob: CronJob;

  constructor() {
    this.s3 = new S3({
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_KEY,
      region: env.AWS_REGION,
    });

    this.backupJob = new CronJob(env.BACKUP_CRON, () => {
      this.performBackup();
    });
  }

  public start() {
    if (env.BACKUP_ENABLED) {
      this.backupJob.start();
      console.log('🔄 Automated backup service started');
    }
  }

  private async performBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;
    const filepath = path.join(__dirname, '../backups', filename);

    try {
      // Ensure backups directory exists
      await fs.promises.mkdir(path.join(__dirname, '../backups'), { recursive: true });

      // Create database backup
      console.log('📦 Creating database backup...');
      await execAsync(
        `PGPASSWORD=${process.env.DATABASE_PASSWORD} pg_dump -h ${process.env.DATABASE_HOST} -U ${process.env.DATABASE_USER} ${process.env.DATABASE_NAME} > ${filepath}`
      );

      // Upload to S3
      console.log('☁️ Uploading backup to S3...');
      await this.s3
        .upload({
          Bucket: env.S3_BUCKET,
          Key: `backups/database/${filename}`,
          Body: fs.createReadStream(filepath),
        })
        .promise();

      // Clean up local file
      await fs.promises.unlink(filepath);

      // Delete old backups
      await this.cleanOldBackups();

      console.log('✅ Backup completed successfully');
    } catch (error) {
      console.error('❌ Backup failed:', error);
    }
  }

  private async cleanOldBackups() {
    try {
      const retentionDate = new Date();
      retentionDate.setDate(retentionDate.getDate() - env.BACKUP_RETENTION_DAYS);

      const { Contents } = await this.s3
        .listObjects({
          Bucket: env.S3_BUCKET,
          Prefix: 'backups/database/',
        })
        .promise();

      const oldBackups = Contents?.filter(
        (obj) => obj.LastModified && obj.LastModified < retentionDate
      );

      if (oldBackups && oldBackups.length > 0) {
        await this.s3
          .deleteObjects({
            Bucket: env.S3_BUCKET,
            Delete: {
              Objects: oldBackups.map((obj) => ({ Key: obj.Key! })),
            },
          })
          .promise();

        console.log(`🗑️ Cleaned up ${oldBackups.length} old backups`);
      }
    } catch (error) {
      console.error('❌ Failed to clean old backups:', error);
    }
  }
}