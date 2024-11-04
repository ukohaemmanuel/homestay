# AWS Deployment Guide for Workshop Management System

## Prerequisites

1. AWS Account Setup:
   - Active AWS account
   - AWS CLI installed and configured
   - IAM user with appropriate permissions

2. Required AWS Services:
   - Amazon RDS (PostgreSQL)
   - Amazon S3
   - Amazon CloudFront
   - Amazon Route 53 (if using custom domain)
   - Amazon Certificate Manager (for SSL)
   - Amazon ElastiCache (optional, for Redis)

## Step-by-Step Deployment

### 1. Database Setup (RDS)

```bash
# Create PostgreSQL database
aws rds create-db-instance \
    --db-instance-identifier workshop-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username workshop_admin \
    --master-user-password <your-password> \
    --allocated-storage 20
```

Configuration:
- Engine: PostgreSQL 14+
- Instance size: t3.micro (minimum)
- Storage: 20GB (adjust as needed)
- Enable automated backups
- Set up security groups

### 2. S3 Bucket Setup

```bash
# Create bucket
aws s3 mb s3://your-workshop-bucket

# Enable static website hosting
aws s3 website s3://your-workshop-bucket \
    --index-document index.html \
    --error-document index.html

# Apply bucket policy (replace with your domain)
aws s3api put-bucket-policy --bucket your-workshop-bucket \
    --policy file://bucket-policy.json
```

### 3. CloudFront Distribution

```bash
# Create distribution
aws cloudfront create-distribution \
    --origin-domain-name your-workshop-bucket.s3.amazonaws.com \
    --default-root-object index.html
```

Configuration:
- Connect to S3 bucket
- Enable HTTPS
- Set up custom domain
- Configure caching behavior

### 4. SSL Certificate (ACM)

```bash
# Request certificate
aws acm request-certificate \
    --domain-name your-domain.com \
    --validation-method DNS \
    --subject-alternative-names *.your-domain.com
```

### 5. Environment Setup

Create `.env.production`:
```env
# API Configuration
VITE_API_URL=https://api.your-domain.com
VITE_WS_URL=wss://api.your-domain.com

# AWS Configuration
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-workshop-bucket
AWS_CLOUDFRONT_ID=your-distribution-id

# Database
DATABASE_URL=postgresql://user:password@your-rds-endpoint:5432/workshop_db

# Redis (optional)
REDIS_URL=your-elasticache-endpoint

# Other Services
STRIPE_PUBLIC_KEY=your-stripe-key
SMTP_HOST=your-smtp-host
```

### 6. Build and Deploy

```bash
# Install dependencies
npm install

# Build application
npm run build

# Deploy to S3
aws s3 sync dist/ s3://your-workshop-bucket

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
    --distribution-id your-distribution-id \
    --paths "/*"
```

### 7. Domain Configuration (Route 53)

```bash
# Create hosted zone
aws route53 create-hosted-zone \
    --name your-domain.com \
    --caller-reference $(date +%s)

# Add CloudFront distribution
aws route53 change-resource-record-sets \
    --hosted-zone-id your-hosted-zone-id \
    --change-batch file://route53-records.json
```

## Production Checklist

### Security
- [ ] Enable WAF (Web Application Firewall)
- [ ] Configure security groups
- [ ] Enable CloudTrail logging
- [ ] Set up CloudWatch alarms
- [ ] Enable S3 encryption
- [ ] Configure RDS encryption

### Performance
- [ ] Set up CloudFront caching
- [ ] Configure RDS read replicas
- [ ] Enable auto-scaling
- [ ] Set up ElastiCache

### Monitoring
- [ ] Configure CloudWatch metrics
- [ ] Set up log aggregation
- [ ] Enable RDS monitoring
- [ ] Configure alerts

### Backup
- [ ] Enable RDS automated backups
- [ ] Configure S3 versioning
- [ ] Set up cross-region replication
- [ ] Test restore procedures

## Cost Optimization

### Recommended Instance Types
- RDS: t3.micro (dev) / t3.small (prod)
- ElastiCache: cache.t3.micro
- S3: Standard storage with lifecycle policies

### Cost-saving Tips
1. Use reserved instances for RDS
2. Enable S3 lifecycle policies
3. Configure CloudFront caching
4. Monitor and adjust resources

## Maintenance

### Regular Tasks
1. Database maintenance
   ```bash
   # Update RDS instance
   aws rds modify-db-instance \
       --db-instance-identifier workshop-db \
       --apply-immediately
   ```

2. SSL certificate renewal
   ```bash
   # Check certificate status
   aws acm describe-certificate \
       --certificate-arn your-certificate-arn
   ```

3. CloudFront cache invalidation
   ```bash
   # After deployments
   aws cloudfront create-invalidation \
       --distribution-id your-distribution-id \
       --paths "/*"
   ```

### Monitoring Commands
```bash
# Check RDS status
aws rds describe-db-instances \
    --db-instance-identifier workshop-db

# View CloudWatch metrics
aws cloudwatch get-metric-statistics \
    --namespace AWS/RDS \
    --metric-name CPUUtilization \
    --dimensions Name=DBInstanceIdentifier,Value=workshop-db \
    --start-time $(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "1 hour ago") \
    --end-time $(date -u +"%Y-%m-%dT%H:%M:%SZ") \
    --period 300 \
    --statistics Average
```

## Troubleshooting

### Common Issues

1. S3 Access Denied
   ```bash
   # Check bucket policy
   aws s3api get-bucket-policy --bucket your-workshop-bucket
   ```

2. CloudFront Issues
   ```bash
   # Check distribution status
   aws cloudfront get-distribution --id your-distribution-id
   ```

3. Database Connection
   ```bash
   # Check security group rules
   aws ec2 describe-security-groups \
       --group-ids your-security-group-id
   ```

### Support Resources
- AWS Documentation: https://docs.aws.amazon.com
- AWS Support: https://support.aws.amazon.com
- Community Forums: https://forums.aws.amazon.com

## Scaling Considerations

### Vertical Scaling
- RDS instance class upgrades
- ElastiCache node type upgrades
- Increase allocated storage

### Horizontal Scaling
- RDS read replicas
- Multiple ElastiCache nodes
- S3 cross-region replication

## Security Best Practices

1. IAM Configuration
   - Use least privilege principle
   - Regularly rotate credentials
   - Enable MFA

2. Network Security
   - Use private subnets
   - Configure security groups
   - Enable VPC flow logs

3. Data Protection
   - Enable encryption at rest
   - Use SSL/TLS for transmission
   - Regular security audits