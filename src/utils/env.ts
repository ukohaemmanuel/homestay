import { z } from 'zod';

export const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number).default('3000'),
  HOST: z.string().default('0.0.0.0'),

  // Database
  DATABASE_URL: z.string(),
  DATABASE_SSL: z.boolean().default(true),

  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),

  // Email
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SMTP_FROM: z.string().email(),

  // Storage
  STORAGE_PROVIDER: z.enum(['local', 'aws', 'gcp', 'azure']),
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),
  STORAGE_REGION: z.string().optional(),

  // Deployment
  DEPLOYMENT_PROVIDER: z.enum(['local', 'aws', 'digitalocean', 'netlify']),
  DOMAIN: z.string().optional(),
  SSL_ENABLED: z.boolean().default(true),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Invalid environment variables:', error.errors);
    process.exit(1);
  }
}