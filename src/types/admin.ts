import { z } from 'zod';

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export enum TenantPlan {
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export interface Tenant {
  id: string;
  name: string;
  plan: TenantPlan;
  status: TenantStatus;
  createdAt: string;
  updatedAt: string;
  userCount: number;
  storageUsed: number;
  storageLimit: number;
  customDomain?: string;
}

export interface CreateTenantInput {
  name: string;
  plan: TenantPlan;
  adminEmail: string;
  adminPassword: string;
}

export interface UpdateTenantInput {
  name?: string;
  plan?: TenantPlan;
  status?: TenantStatus;
  storageLimit?: number;
  customDomain?: string;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  networkUsage: number;
  activeUsers: number;
  totalTenants: number;
  alertCount: number;
}</content>