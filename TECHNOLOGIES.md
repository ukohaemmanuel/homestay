# Technologies Used

## Frontend
- React 18.3 (UI Framework)
- TypeScript (Type-safe JavaScript)
- Vite (Build Tool)
- TailwindCSS (Styling)
- Lucide React (Icons)
- React Router (Navigation)
- Zustand (State Management)
- React Query (Data Fetching)
- React Hook Form (Form Management)
- Zod (Validation)
- i18next (Internationalization)

## Backend Requirements
- Node.js (18+)
- PostgreSQL (14+)
- Redis (Optional, for caching)

## Cloud Services
- AWS S3/GCP/Azure (File Storage)
- SendGrid/SMTP (Email)
- Stripe (Payments)

## Security
- JWT (Authentication)
- 2FA Support
- SSL/TLS
- Rate Limiting

## Environment Variables Required

### Core
```env
# Server
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname
DATABASE_SSL=true

# Authentication
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=1d

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
SMTP_FROM=noreply@example.com

# Storage
STORAGE_PROVIDER=aws
STORAGE_BUCKET=your-bucket
STORAGE_ACCESS_KEY=your-access-key
STORAGE_SECRET_KEY=your-secret-key
STORAGE_REGION=your-region

# Deployment
DEPLOYMENT_PROVIDER=aws
DOMAIN=your-domain.com
SSL_ENABLED=true
```

### Optional
```env
# Google SSO
GOOGLE_CLIENT_ID=your-client-id

# Stripe
STRIPE_PUBLIC_KEY=your-public-key
STRIPE_SECRET_KEY=your-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Monitoring
SENTRY_DSN=your-sentry-dsn
```