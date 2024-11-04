import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  CheckCircle, 
  BarChart, 
  Users, 
  Calendar,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import { useThemeStore } from '../store/theme';

const features = [
  {
    title: 'Task Management',
    description: 'Efficiently manage and track all workshop tasks and assignments',
    icon: CheckCircle,
  },
  {
    title: 'Equipment Tracking',
    description: 'Monitor equipment status and maintenance schedules',
    icon: Wrench,
  },
  {
    title: 'Team Collaboration',
    description: 'Seamless communication and task assignment for your team',
    icon: Users,
  },
  {
    title: 'Analytics & Reports',
    description: 'Comprehensive insights into workshop performance',
    icon: BarChart,
  },
  {
    title: 'Maintenance Scheduling',
    description: 'Plan and track equipment maintenance efficiently',
    icon: Calendar,
  },
];

export default function Landing() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Wrench className="h-8 w-8 text-brand-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Workshop Manager
                </span>
              </div>
              <div className="flex items-center space-x-4">
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
                <Link to="/login" className="btn">
                  Sign In
                </Link>
                <Link to="/register" className="btn-secondary">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Streamline Your</span>
                <span className="block text-brand-600">Workshop Operations</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Comprehensive workshop management solution for efficient task tracking,
                equipment maintenance, and team collaboration.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Free Trial
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="/contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Everything You Need to Manage Your Workshop
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                Powerful features designed to boost productivity and streamline operations
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div>
                      <feature.icon className="h-8 w-8 text-brand-600" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/features/${feature.title.toLowerCase().replace(' ', '-')}`}
                        className="inline-flex items-center text-brand-600 hover:text-brand-700"
                      >
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-brand-200">
                Start your free trial today.
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2">
                <Link to="/privacy" className="text-gray-400 hover:text-gray-500">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-gray-500">
                  Terms of Service
                </Link>
                <Link to="/contact" className="text-gray-400 hover:text-gray-500">
                  Contact
                </Link>
              </div>
              <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                © {new Date().getFullYear()} Workshop Manager. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}