import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Settings, Database, Mail, Cloud, Shield, Server } from 'lucide-react';
import { adminApi } from '../../lib/api/admin';

const installationSchema = z.object({
  database: z.object({
    type: z.enum(['postgres', 'mysql']),
    host: z.string().min(1, 'Host is required'),
    port: z.string().min(1, 'Port is required'),
    name: z.string().min(1, 'Database name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  }),
  email: z.object({
    provider: z.enum(['smtp', 'sendgrid', 'mailgun']),
    host: z.string().min(1, 'SMTP host is required'),
    port: z.string().min(1, 'SMTP port is required'),
    username: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    fromAddress: z.string().email('Invalid email'),
  }),
  storage: z.object({
    provider: z.enum(['local', 'aws', 'gcp', 'azure']),
    bucket: z.string().min(1, 'Bucket name is required').optional(),
    accessKey: z.string().min(1, 'Access key is required').optional(),
    secretKey: z.string().min(1, 'Secret key is required').optional(),
    region: z.string().min(1, 'Region is required').optional(),
  }),
  security: z.object({
    jwtSecret: z.string().min(32, 'JWT secret must be at least 32 characters'),
    adminEmail: z.string().email('Invalid email'),
    adminPassword: z.string().min(8, 'Password must be at least 8 characters'),
  }),
  deployment: z.object({
    provider: z.enum(['local', 'aws', 'digitalocean', 'netlify']),
    domain: z.string().optional(),
    sslEnabled: z.boolean(),
  }),
});

type InstallationForm = z.infer<typeof installationSchema>;

const steps = [
  { id: 'database', title: 'Database Configuration', icon: Database },
  { id: 'email', title: 'Email Configuration', icon: Mail },
  { id: 'storage', title: 'Storage Configuration', icon: Cloud },
  { id: 'security', title: 'Security Configuration', icon: Shield },
  { id: 'deployment', title: 'Deployment Configuration', icon: Server },
];

export default function InstallationWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isInstalling, setIsInstalling] = React.useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InstallationForm>();

  const onSubmit = async (data: InstallationForm) => {
    try {
      setIsInstalling(true);
      
      // Test connections before proceeding
      await adminApi.testDatabaseConnection(data.database);
      await adminApi.testEmailConnection(data.email);
      if (data.storage.provider !== 'local') {
        await adminApi.testStorageConnection(data.storage);
      }

      // Save configuration and start installation
      await adminApi.saveConfiguration(data);
      await adminApi.startInstallation();

      navigate('/admin/dashboard', { 
        state: { message: 'Installation completed successfully' }
      });
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const currentStepData = steps[currentStep];
  const watchStorage = watch('storage.provider');
  const watchDeployment = watch('deployment.provider');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Settings className="h-12 w-12 text-brand-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          System Installation
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-brand-600' : 'text-gray-400'
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                  <span className="mt-2 text-xs">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full bg-gray-200 rounded h-1">
                  <div
                    className="bg-brand-600 h-1 rounded transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Database Configuration */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="label">Database Type</label>
                  <select {...register('database.type')} className="input">
                    <option value="postgres">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Host</label>
                    <input {...register('database.host')} className="input" />
                    {errors.database?.host && (
                      <p className="error">{errors.database.host.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Port</label>
                    <input {...register('database.port')} className="input" />
                    {errors.database?.port && (
                      <p className="error">{errors.database.port.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="label">Database Name</label>
                  <input {...register('database.name')} className="input" />
                  {errors.database?.name && (
                    <p className="error">{errors.database.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Username</label>
                    <input {...register('database.username')} className="input" />
                    {errors.database?.username && (
                      <p className="error">{errors.database.username.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Password</label>
                    <input 
                      type="password" 
                      {...register('database.password')} 
                      className="input" 
                    />
                    {errors.database?.password && (
                      <p className="error">{errors.database.password.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Email Configuration */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="label">Email Provider</label>
                  <select {...register('email.provider')} className="input">
                    <option value="smtp">SMTP</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">SMTP Host</label>
                    <input {...register('email.host')} className="input" />
                    {errors.email?.host && (
                      <p className="error">{errors.email.host.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">SMTP Port</label>
                    <input {...register('email.port')} className="input" />
                    {errors.email?.port && (
                      <p className="error">{errors.email.port.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Username</label>
                    <input {...register('email.username')} className="input" />
                    {errors.email?.username && (
                      <p className="error">{errors.email.username.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Password</label>
                    <input 
                      type="password" 
                      {...register('email.password')} 
                      className="input" 
                    />
                    {errors.email?.password && (
                      <p className="error">{errors.email.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="label">From Address</label>
                  <input {...register('email.fromAddress')} className="input" />
                  {errors.email?.fromAddress && (
                    <p className="error">{errors.email.fromAddress.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Storage Configuration */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="label">Storage Provider</label>
                  <select {...register('storage.provider')} className="input">
                    <option value="local">Local Storage</option>
                    <option value="aws">AWS S3</option>
                    <option value="gcp">Google Cloud Storage</option>
                    <option value="azure">Azure Blob Storage</option>
                  </select>
                </div>

                {watchStorage !== 'local' && (
                  <>
                    <div>
                      <label className="label">Bucket Name</label>
                      <input {...register('storage.bucket')} className="input" />
                      {errors.storage?.bucket && (
                        <p className="error">{errors.storage.bucket.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Access Key</label>
                        <input {...register('storage.accessKey')} className="input" />
                        {errors.storage?.accessKey && (
                          <p className="error">{errors.storage.accessKey.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="label">Secret Key</label>
                        <input 
                          type="password" 
                          {...register('storage.secretKey')} 
                          className="input" 
                        />
                        {errors.storage?.secretKey && (
                          <p className="error">{errors.storage.secretKey.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="label">Region</label>
                      <input {...register('storage.region')} className="input" />
                      {errors.storage?.region && (
                        <p className="error">{errors.storage.region.message}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Security Configuration */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="label">JWT Secret</label>
                  <input 
                    type="password" 
                    {...register('security.jwtSecret')} 
                    className="input" 
                  />
                  {errors.security?.jwtSecret && (
                    <p className="error">{errors.security.jwtSecret.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Admin Email</label>
                  <input {...register('security.adminEmail')} className="input" />
                  {errors.security?.adminEmail && (
                    <p className="error">{errors.security.adminEmail.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Admin Password</label>
                  <input 
                    type="password" 
                    {...register('security.adminPassword')} 
                    className="input" 
                  />
                  {errors.security?.adminPassword && (
                    <p className="error">{errors.security.adminPassword.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Deployment Configuration */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="label">Deployment Provider</label>
                  <select {...register('deployment.provider')} className="input">
                    <option value="local">Local Deployment</option>
                    <option value="aws">AWS</option>
                    <option value="digitalocean">DigitalOcean</option>
                    <option value="netlify">Netlify</option>
                  </select>
                </div>

                {watchDeployment !== 'local' && (
                  <div>
                    <label className="label">Domain Name</label>
                    <input {...register('deployment.domain')} className="input" />
                  </div>
                )}

                <div>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      {...register('deployment.sslEnabled')} 
                      className="rounded border-gray-300"
                    />
                    <span>Enable SSL/TLS</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="btn-secondary"
                disabled={currentStep === 0}
              >
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="btn"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isInstalling}
                  className="btn"
                >
                  {isInstalling ? 'Installing...' : 'Complete Installation'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}