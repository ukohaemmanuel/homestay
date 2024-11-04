import { z } from 'zod';

export const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number).default('3000'),
  HOST: z.string().default('0.0.0.0'),

  // Database
  DATABASE_URL: z.string(),
  DATABASE_SSL: z.boolean().default(true),
  DATABASE_MAX_CONNECTIONS: z.number().default(20),
  DATABASE_IDLE_TIMEOUT: z.number().default(30000),

  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string().email(),

  // Storage
  S3_BUCKET: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  AWS_REGION: z.string(),

  // SSL/TLS
  SSL_KEY_PATH: z.string().optional(),
  SSL_CERT_PATH: z.string().optional(),
  SSL_CA_PATH: z.string().optional(),

  // Security
  CORS_ORIGINS: z.string().transform(str => str.split(',')),
  RATE_LIMIT_WINDOW: z.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX: z.number().default(100),

  // Backup
  BACKUP_ENABLED: z.boolean().default(true),
  BACKUP_CRON: z.string().default('0 0 * * *'), // Daily at midnight
  BACKUP_RETENTION_DAYS: z.number().default(30),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error.errors);
    process.exit(1);
  }
}