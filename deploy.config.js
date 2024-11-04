const config = {
  app: {
    name: 'workshop-management',
    type: 'web',
    framework: 'react',
  },
  deployment: {
    providers: ['aws', 'digitalocean', 'netlify'],
    requirements: {
      node: '>=18.0.0',
      npm: '>=9.0.0',
    },
  },
  env: {
    required: [
      'DATABASE_URL',
      'JWT_SECRET',
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASS',
      'S3_BUCKET',
      'AWS_ACCESS_KEY',
      'AWS_SECRET_KEY',
    ],
  },
};