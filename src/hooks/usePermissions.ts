import { useAuthStore } from '../store/auth';
import { UserRole } from '../types';

const roleHierarchy: Record<UserRole, number> = {
  SYSTEM_ADMIN: 100,
  ORGANIZATION_OWNER: 90,
  WORKSHOP_MANAGER: 80,
  EQUIPMENT_MANAGER: 70,
  REPORT_ANALYST: 60,
  TECHNICIAN: 50,
  BASIC_USER: 10,
};

export function usePermissions() {
  const user = useAuthStore((state) => state.user);

  const hasRole = (role: UserRole) => {
    if (!user) return false;
    return roleHierarchy[user.role] >= roleHierarchy[role];
  };

  const can = (action: string) => {
    if (!user) return false;

    switch (action) {
      case 'manage_users':
        return hasRole(UserRole.WORKSHOP_MANAGER);
      case 'manage_equipment':
        return hasRole(UserRole.EQUIPMENT_MANAGER);
      case 'generate_reports':
        return hasRole(UserRole.REPORT_ANALYST);
      case 'assign_tasks':
        return hasRole(UserRole.WORKSHOP_MANAGER);
      case 'view_analytics':
        return hasRole(UserRole.WORKSHOP_MANAGER);
      default:
        return false;
    }
  };

  return {
    hasRole,
    can,
    isAdmin: hasRole(UserRole.SYSTEM_ADMIN),
    isOwner: hasRole(UserRole.ORGANIZATION_OWNER),
    isManager: hasRole(UserRole.WORKSHOP_MANAGER),
  };
}