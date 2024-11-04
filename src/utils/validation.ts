import { z } from 'zod';
import { UserRole, TaskStatus, TaskPriority, EquipmentStatus } from '../types';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  assigneeId: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
});

export const equipmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  model: z.string().min(1, 'Model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  status: z.nativeEnum(EquipmentStatus),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
});