import { Pool } from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { validateEnv } from '../config/env.config';

const env = validateEnv();

async function migrate() {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_SSL ? {
      rejectUnauthorized: false,
    } : false,
  });

  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get list of executed migrations
    const { rows: executedMigrations } = await pool.query(
      'SELECT name FROM migrations'
    );
    const executedMigrationNames = executedMigrations.map((row) => row.name);

    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files
      .filter((f) => f.endsWith('.sql'))
      .sort();

    // Execute new migrations
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        console.log(`🔄 Executing migration: ${file}`);

        const filePath = path.join(migrationsDir, file);
        const sql = await fs.readFile(filePath, 'utf-8');

        await pool.query('BEGIN');
        try {
          await pool.query(sql);
          await pool.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
          await pool.query('COMMIT');
          console.log(`✅ Migration completed: ${file}`);
        } catch (error) {
          await pool.query('ROLLBACK');
          throw error;
        }
      }
    }

    console.log('✨ All migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();