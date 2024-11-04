import React from 'react';
import { Puzzle, MessageSquare, Mail, Cloud, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { adminApi } from '../../lib/api/admin';

const integrationsSchema = z.object({
  slack: z.object({
    enabled: z.boolean(),
    webhookUrl: z.string().url().optional(),
    apiKey: z.string().optional(),
    channel: z.string().optional(),
  }),
  email: z.object({
    provider: z.enum(['smtp', 'sendgrid', 'mailgun']),
    apiKey: z.string(),
    domain: z.string(),
    fromEmail: z.string().email(),
    fromName: z.string(),
  }),
  storage: z.object({
    provider: z.enum(['aws', 'gcp', 'azure']),
    accessKey: z.string(),
    secretKey: z.string(),
    bucket: z.string(),
    region: z.string(),
  }),
  payment: z.object({
    provider: z.enum(['stripe', 'paypal']),
    publicKey: z.string(),
    secretKey: z.string(),
    webhookSecret: z.string(),
  }),
});

type IntegrationsForm = z.infer<typeof integrationsSchema>;

export default function IntegrationsConfig() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IntegrationsForm>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data: IntegrationsForm) => {
    try {
      setIsLoading(true);
      await adminApi.updateIntegrationsConfig(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update integrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure third-party service integrations
          </p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
          Integrations updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Slack Integration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('slack.enabled')}
                  className="rounded border-gray-300"
                />
                <span>Enable Slack Integration</span>
              </label>
            </div>

            {watch('slack.enabled') && (
              <>
                <div>
                  <label className="label">Webhook URL</label>
                  <input
                    type="text"
                    {...register('slack.webhookUrl')}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">API Key</label>
                  <input
                    type="password"
                    {...register('slack.apiKey')}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Default Channel</label>
                  <input
                    type="text"
                    {...register('slack.channel')}
                    className="input"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Email Provider</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Provider</label>
              <select {...register('email.provider')} className="input">
                <option value="smtp">SMTP</option>
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
              </select>
            </div>

            <div>
              <label className="label">API Key</label>
              <input
                type="password"
                {...register('email.apiKey')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Domain</label>
              <input
                type="text"
                {...register('email.domain')}
                className="input"
              />
            </div>

            <div>
              <label className="label">From Email</label>
              <input
                type="email"
                {...register('email.fromEmail')}
                className="input"
              />
            </div>

            <div>
              <label className="label">From Name</label>
              <input
                type="text"
                {...register('email.fromName')}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Cloud className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Storage Provider</h2>
          </div>

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
              <label className="label">Access Key</label>
              <input
                type="password"
                {...register('storage.accessKey')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Secret Key</label>
              <input
                type="password"
                {...register('storage.secretKey')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Bucket Name</label>
              <input
                type="text"
                {...register('storage.bucket')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Region</label>
              <input
                type="text"
                {...register('storage.region')}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="h-6 w-6 text-brand-600 mr-2" />
            <h2 className="text-lg font-medium">Payment Provider</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Provider</label>
              <select {...register('payment.provider')} className="input">
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div>
              <label className="label">Public Key</label>
              <input
                type="text"
                {...register('payment.publicKey')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Secret Key</label>
              <input
                type="password"
                {...register('payment.secretKey')}
                className="input"
              />
            </div>

            <div>
              <label className="label">Webhook Secret</label>
              <input
                type="password"
                {...register('payment.webhookSecret')}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn"
          >
            {isLoading ? 'Saving...' : 'Save Integration Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}