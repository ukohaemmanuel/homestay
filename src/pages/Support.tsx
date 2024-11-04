import React from 'react';
import { HelpCircle, Book, MessageCircle, Phone } from 'lucide-react';

const supportCategories = [
  {
    title: 'Documentation',
    icon: Book,
    description: 'Access user guides and documentation',
    link: '#',
  },
  {
    title: 'Live Chat',
    icon: MessageCircle,
    description: 'Chat with our support team',
    link: '#',
  },
  {
    title: 'Phone Support',
    icon: Phone,
    description: 'Call us for immediate assistance',
    link: '#',
  },
];

const faqs = [
  {
    question: 'How do I create a new task?',
    answer:
      'To create a new task, click the "New Task" button in the Tasks page. Fill in the required information and click "Create Task".',
  },
  {
    question: 'How do I schedule equipment maintenance?',
    answer:
      'Navigate to the Equipment page, find the equipment you want to schedule maintenance for, and click "Schedule Maintenance".',
  },
  {
    question: 'How do I generate reports?',
    answer:
      'Go to the Reports page, select the type of report you want to generate, set the parameters, and click "Generate".',
  },
];

export default function Support() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Get help and learn how to use the workshop management system
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <category.icon className="h-6 w-6 text-brand-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <a
                href={category.link}
                className="text-brand-600 hover:text-brand-700 text-sm font-medium"
              >
                Learn more →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6">
              <h3 className="text-sm font-medium text-gray-900">
                <HelpCircle className="h-5 w-5 text-brand-600 inline mr-2" />
                {faq.question}
              </h3>
              <p className="mt-2 text-sm text-gray-500 ml-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-50 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Phone className="h-6 w-6 text-brand-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-brand-900">
              Still need help?
            </h3>
            <p className="mt-1 text-sm text-brand-700">
              Our support team is available 24/7 to assist you.
            </p>
          </div>
          <div className="ml-auto">
            <button className="btn">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}