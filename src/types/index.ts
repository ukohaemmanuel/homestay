import { z } from 'zod';

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  ORGANIZATION_OWNER = 'ORGANIZATION_OWNER',
  WORKSHOP_MANAGER = 'WORKSHOP_MANAGER',
  TECHNICIAN = 'TECHNICIAN',
  EQUIPMENT_MANAGER = 'EQUIPMENT_MANAGER',
  REPORT_ANALYST = 'REPORT_ANALYST',
  BASIC_USER = 'BASIC_USER',
}

export enum TaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum EquipmentStatus {
  OPERATIONAL = 'OPERATIONAL',
  IN_USE = 'IN_USE',
  MAINTENANCE = 'MAINTENANCE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: UserRole;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  documents: TaskDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskDocument {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  documents?: File[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  documents?: File[];
}

export interface Equipment {
  id: string;
  name: string;
  status: EquipmentStatus;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEquipmentInput {
  name: string;
  status: EquipmentStatus;
  model: string;
  serialNumber: string;
  purchaseDate: string;
}

export interface UpdateEquipmentInput {
  name?: string;
  status?: EquipmentStatus;
  model?: string;
  serialNumber?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}