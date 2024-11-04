import { CronJob } from 'cron';
import { exec } from 'child_process';
import { S3 } from 'aws-sdk';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class BackupManager {
  private s3: S3;
  private backupJob: CronJob;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    // Run backup every day at 2 AM
    this.backupJob = new CronJob('0 2 * * *', () => {
      this.performBackup();
    });
  }

  public start() {
    this.backupJob.start();
  }

  private async performBackup() {
    try {
      // Backup database
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `backup-${timestamp}.sql`;
      
      await execAsync(
        `pg_dump -U ${process.env.DB_USER} -h ${process.env.DB_HOST} ${process.env.DB_NAME} > ${filename}`
      );

      // Upload to S3
      await this.s3
        .upload({
          Bucket: process.env.AWS_BACKUP_BUCKET!,
          Key: `database/${filename}`,
          Body: require('fs').createReadStream(filename),
        })
        .promise();

      // Clean up local file
      await execAsync(`rm ${filename}`);
    } catch (error) {
      console.error('Backup failed:', error);
    }
  }
}