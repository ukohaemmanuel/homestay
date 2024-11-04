import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authApi } from '../../lib/api/auth';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { Wrench, Building2, Mail, Lock, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/theme';

const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Call the registration API
      await authApi.registerTenant({
        name: data.companyName,
        email: data.email,
        password: data.password,
      });

      // Redirect to login with success message
      navigate('/login', {
        state: { message: 'Account created successfully. Please log in.' }
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch('password');

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${theme}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Wrench className="h-12 w-12 text-brand-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your workspace
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Get started with your workshop management account
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
            <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-group">
              <input
                id="companyName"
                type="text"
                placeholder=" "
                {...register('companyName')}
                className="form-input pl-10"
              />
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              {errors.companyName && (
                <p className="form-error">{errors.companyName.message}</p>
              )}
            </div>

            <div className="form-group">
              <input
                id="email"
                type="email"
                placeholder=" "
                {...register('email')}
                className="form-input pl-10"
              />
              <label htmlFor="email" className="form-label">
                Email Address
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

            <div className="form-group">
              <input
                id="confirmPassword"
                type="password"
                placeholder=" "
                {...register('confirmPassword')}
                className="form-input pl-10"
              />
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {password && (
              <div className="text-sm space-y-1">
                <p className={password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                  • At least 8 characters
                </p>
                <p className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                  • One uppercase letter
                </p>
                <p className={/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                  • One number
                </p>
                <p className={/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'}>
                  • One special character
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="w-full btn-secondary dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}