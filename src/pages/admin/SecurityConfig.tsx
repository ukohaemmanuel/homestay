import React from 'react';
import { Shield, Key, Lock, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { adminApi } from '../../lib/api/admin';

const securitySchema = z.object({
  authentication: z.object({
    minPasswordLength: z.number().min(8),
    requireSpecialCharacters: z.boolean(),
    requireNumbers: z.boolean(),
    requireUppercase: z.boolean(),
    passwordExpiryDays: z.number(),
    maxLoginAttempts: z.number(),
    lockoutDurationMinutes: z.number(),
  }),
  twoFactor: z.object({
    required: z.boolean(),
    issuer: z.string(),
    validityWindow: z.number(),
  }),
  session: z.object({
    tokenExpiryMinutes: z.number(),
    refreshTokenExpiryDays: z.number(),
    maxConcurrentSessions: z.number(),
  }),
  cors: z.object({
    allowedOrigins: z.string(),
    allowedMethods: z.string(),
    allowCredentials: z.boolean(),
  }),
});

type SecurityForm = z.infer<typeof securitySchema>;

export default function SecurityConfig() {
  const { register, handleSubmit, formState: { errors } } = useForm<SecurityForm>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data: SecurityForm) => {
    try {
      setIsLoading(true);
      await adminApi.updateSecurityConfig(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update security config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Configuration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure system-wide security settings and policies
          </p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          Security configuration updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Password Policy</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Minimum Password Length</label>
              <input
                type="number"
                {...register('authentication.minPasswordLength')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Password Expiry (Days)</label>
              <input
                type="number"
                {...register('authentication.passwordExpiryDays')}
                className="input"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('authentication.requireSpecialCharacters')}
                  className="rounded border-gray-300"
                />
                <span>Require Special Characters</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('authentication.requireNumbers')}
                  className="rounded border-gray-300"
                />
                <span>Require Numbers</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('authentication.requireUppercase')}
                  className="rounded border-gray-300"
                />
                <span>Require Uppercase Letters</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Two-Factor Authentication</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('twoFactor.required')}
                  className="rounded border-gray-300"
                />
                <span>Require 2FA for All Users</span>
              </label>
            </div>

            <div>
              <label className="label">TOTP Issuer Name</label>
              <input
                type="text"
                {...register('twoFactor.issuer')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Code Validity Window (seconds)</label>
              <input
                type="number"
                {...register('twoFactor.validityWindow')}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Key className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Session Management</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Token Expiry (minutes)</label>
              <input
                type="number"
                {...register('session.tokenExpiryMinutes')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Refresh Token Expiry (days)</label>
              <input
                type="number"
                {...register('session.refreshTokenExpiryDays')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Max Concurrent Sessions</label>
              <input
                type="number"
                {...register('session.maxConcurrentSessions')}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">CORS Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">Allowed Origins (comma-separated)</label>
              <input
                type="text"
                {...register('cors.allowedOrigins')}
                className="input"
                placeholder="https://example.com,https://app.example.com"
              />
            </div>

            <div>
              <label className="label">Allowed Methods (comma-separated)</label>
              <input
                type="text"
                {...register('cors.allowedMethods')}
                className="input"
                placeholder="GET,POST,PUT,DELETE"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('cors.allowCredentials')}
                  className="rounded border-gray-300"
                />
                <span>Allow Credentials</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn"
          >
            {isLoading ? 'Saving...' : 'Save Security Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}