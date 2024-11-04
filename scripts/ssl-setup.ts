import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function setupSSL() {
  const sslDir = path.join(__dirname, '../ssl');

  try {
    // Create SSL directory
    await fs.mkdir(sslDir, { recursive: true });

    // Generate SSL certificate using OpenSSL
    console.log('🔐 Generating SSL certificate...');

    // Generate private key
    await execAsync(
      `openssl genrsa -out ${path.join(sslDir, 'private.key')} 2048`
    );

    // Generate CSR
    await execAsync(
      `openssl req -new -key ${path.join(sslDir, 'private.key')} \
      -out ${path.join(sslDir, 'certificate.csr')} \
      -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`
    );

    // Generate self-signed certificate
    await execAsync(
      `openssl x509 -req -days 365 \
      -in ${path.join(sslDir, 'certificate.csr')} \
      -signkey ${path.join(sslDir, 'private.key')} \
      -out ${path.join(sslDir, 'certificate.crt')}`
    );

    console.log('✅ SSL certificate generated successfully');
    console.log('📁 Certificate files located in:', sslDir);
  } catch (error) {
    console.error('❌ Failed to generate SSL certificate:', error);
    process.exit(1);
  }
}

setupSSL();