import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '../store/auth';
import { useThemeStore } from '../store/theme';
import { Wrench, Sun, Moon, Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  totpToken: z.string().length(6, 'TOTP token must be 6 digits').optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const { theme, toggleTheme } = useThemeStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = React.useState(false);
  const [tempEmail, setTempEmail] = React.useState('');

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      setError('');

      if (!requiresTwoFactor) {
        const response = await login(data.email, data.password);
        if (response.requiresTwoFactor) {
          setRequiresTwoFactor(true);
          setTempEmail(data.email);
        } else {
          navigate('/', { replace: true });
        }
      } else {
        await login(tempEmail, '', data.totpToken);
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${theme}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Wrench className="h-12 w-12 text-brand-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {requiresTwoFactor ? 'Enter 2FA Code' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {requiresTwoFactor ? 
            'Please enter the code from your authenticator app' : 
            'Sign in to your account'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {location.state?.message && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
              {location.state.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!requiresTwoFactor ? (
              <>
                <div className="form-group">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    autoComplete="email"
                    {...register('email')}
                    className="form-input pl-10"
                  />
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <input
                    id="password"
                    type="password"
                    placeholder=" "
                    autoComplete="current-password"
                    {...register('password')}
                    className="form-input pl-10"
                  />
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  {errors.password && (
                    <p className="form-error">{errors.password.message}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="form-group">
                <input
                  id="totpToken"
                  type="text"
                  maxLength={6}
                  placeholder=" "
                  {...register('totpToken')}
                  className="form-input text-center tracking-[0.5em] font-mono text-lg"
                />
                <label htmlFor="totpToken" className="form-label">
                  Authentication Code
                </label>
                {errors.totpToken && (
                  <p className="form-error">{errors.totpToken.message}</p>
                )}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn"
              >
                {isLoading ? 'Signing in...' : requiresTwoFactor ? 'Verify' : 'Sign in'}
              </button>
            </div>
          </form>

          {!requiresTwoFactor && (
            <>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate('/register')}
                    className="w-full btn-secondary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Create an account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}