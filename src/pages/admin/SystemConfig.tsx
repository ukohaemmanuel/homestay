import React from 'react';
import { Save, Key, Database, Mail, Cloud, Server } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const configSchema = z.object({
  database: z.object({
    host: z.string().min(1, 'Host is required'),
    port: z.string().min(1, 'Port is required'),
    name: z.string().min(1, 'Database name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  }),
  email: z.object({
    host: z.string().min(1, 'SMTP host is required'),
    port: z.string().min(1, 'SMTP port is required'),
    username: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    fromAddress: z.string().email('Invalid email'),
  }),
  storage: z.object({
    provider: z.enum(['aws', 'gcp', 'azure']),
    bucket: z.string().min(1, 'Bucket name is required'),
    accessKey: z.string().min(1, 'Access key is required'),
    secretKey: z.string().min(1, 'Secret key is required'),
    region: z.string().min(1, 'Region is required'),
  }),
  security: z.object({
    jwtSecret: z.string().min(32, 'JWT secret must be at least 32 characters'),
    sessionTimeout: z.string().min(1, 'Session timeout is required'),
    allowedOrigins: z.string().min(1, 'Allowed origins is required'),
  }),
});

type ConfigForm = z.infer<typeof configSchema>;

const ConfigSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-lg font-medium text-gray-900 ml-2">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export default function SystemConfig() {
  const { register, handleSubmit, formState: { errors } } = useForm<ConfigForm>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data: ConfigForm) => {
    try {
      setIsLoading(true);
      // API call to save configuration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage system-wide environment variables and secrets
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="btn"
        >
          <Save className="h-5 w-5 mr-2" />
          {isLoading ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          Configuration saved successfully
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ConfigSection title="Database Configuration" icon={<Database className="h-6 w-6 text-brand-600" />}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Host</label>
              <input {...register('database.host')} className="input" />
              {errors.database?.host && (
                <p className="mt-1 text-sm text-red-600">{errors.database.host.message}</p>
              )}
            </div>
            <div>
              <label className="label">Port</label>
              <input {...register('database.port')} className="input" />
              {errors.database?.port && (
                <p className="mt-1 text-sm text-red-600">{errors.database.port.message}</p>
              )}
            </div>
            <div>
              <label className="label">Database Name</label>
              <input {...register('database.name')} className="input" />
              {errors.database?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.database.name.message}</p>
              )}
            </div>
            <div>
              <label className="label">Username</label>
              <input {...register('database.username')} className="input" />
              {errors.database?.username && (
                <p className="mt-1 text-sm text-red-600">{errors.database.username.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="label">Password</label>
              <input type="password" {...register('database.password')} className="input" />
              {errors.database?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.database.password.message}</p>
              )}
            </div>
          </div>
        </ConfigSection>

        <ConfigSection title="Email Configuration" icon={<Mail className="h-6 w-6 text-brand-600" />}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">SMTP Host</label>
              <input {...register('email.host')} className="input" />
              {errors.email?.host && (
                <p className="mt-1 text-sm text-red-600">{errors.email.host.message}</p>
              )}
            </div>
            <div>
              <label className="label">SMTP Port</label>
              <input {...register('email.port')} className="input" />
              {errors.email?.port && (
                <p className="mt-1 text-sm text-red-600">{errors.email.port.message}</p>
              )}
            </div>
            <div>
              <label className="label">Username</label>
              <input {...register('email.username')} className="input" />
              {errors.email?.username && (
                <p className="mt-1 text-sm text-red-600">{errors.email.username.message}</p>
              )}
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" {...register('email.password')} className="input" />
              {errors.email?.password && (
                <p className="mt-1 text-sm text-red-600">{errors.email.password.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="label">From Address</label>
              <input {...register('email.fromAddress')} className="input" />
              {errors.email?.fromAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.email.fromAddress.message}</p>
              )}
            </div>
          </div>
        </ConfigSection>

        <ConfigSection title="Storage Configuration" icon={<Cloud className="h-6 w-6 text-brand-600" />}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Provider</label>
              <select {...register('storage.provider')} className="input">
                <option value="aws">AWS S3</option>
                <option value="gcp">Google Cloud Storage</option>
                <option value="azure">Azure Blob Storage</option>
              </select>
            </div>
            <div>
              <label className="label">Bucket Name</label>
              <input {...register('storage.bucket')} className="input" />
              {errors.storage?.bucket && (
                <p className="mt-1 text-sm text-red-600">{errors.storage.bucket.message}</p>
              )}
            </div>
            <div>
              <label className="label">Access Key</label>
              <input {...register('storage.accessKey')} className="input" />
              {errors.storage?.accessKey && (
                <p className="mt-1 text-sm text-red-600">{errors.storage.accessKey.message}</p>
              )}
            </div>
            <div>
              <label className="label">Secret Key</label>
              <input type="password" {...register('storage.secretKey')} className="input" />
              {errors.storage?.secretKey && (
                <p className="mt-1 text-sm text-red-600">{errors.storage.secretKey.message}</p>
              )}
            </div>
            <div>
              <label className="label">Region</label>
              <input {...register('storage.region')} className="input" />
              {errors.storage?.region && (
                <p className="mt-1 text-sm text-red-600">{errors.storage.region.message}</p>
              )}
            </div>
          </div>
        </ConfigSection>

        <ConfigSection title="Security Configuration" icon={<Key className="h-6 w-6 text-brand-600" />}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">JWT Secret</label>
              <input type="password" {...register('security.jwtSecret')} className="input" />
              {errors.security?.jwtSecret && (
                <p className="mt-1 text-sm text-red-600">{errors.security.jwtSecret.message}</p>
              )}
            </div>
            <div>
              <label className="label">Session Timeout (minutes)</label>
              <input type="number" {...register('security.sessionTimeout')} className="input" />
              {errors.security?.sessionTimeout && (
                <p className="mt-1 text-sm text-red-600">{errors.security.sessionTimeout.message}</p>
              )}
            </div>
            <div>
              <label className="label">Allowed Origins (comma-separated)</label>
              <input {...register('security.allowedOrigins')} className="input" placeholder="https://example.com,https://app.example.com" />
              {errors.security?.allowedOrigins && (
                <p className="mt-1 text-sm text-red-600">{errors.security.allowedOrigins.message}</p>
              )}
            </div>
          </div>
        </ConfigSection>
      </form>
    </div>
  );
}