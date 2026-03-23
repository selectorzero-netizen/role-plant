/**
 * permissionUtils.ts
 * 
 * Centralized logic for role-based access control.
 */
import { UserRole } from '../types';

export type PermissionAction = 
  | 'view_admin'
  | 'manage_plants'
  | 'manage_posts'
  | 'manage_content'
  | 'manage_media'
  | 'manage_members'
  | 'manage_applications'
  | 'manage_inquiries'
  | 'manage_taxonomy'
  | 'manage_settings';

const ROLE_PERMISSIONS: Record<UserRole, PermissionAction[]> = {
  super_admin: [
    'view_admin',
    'manage_plants',
    'manage_posts',
    'manage_content',
    'manage_media',
    'manage_members',
    'manage_applications',
    'manage_inquiries',
    'manage_taxonomy',
    'manage_settings'
  ],
  admin: [
    'view_admin',
    'manage_plants',
    'manage_posts',
    'manage_content',
    'manage_media',
    'manage_members',
    'manage_applications',
    'manage_inquiries'
  ],
  editor: [
    'view_admin',
    'manage_plants',
    'manage_posts',
    'manage_content',
    'manage_media',
    'manage_inquiries'
  ],
  member: [],
  guest: []
};

export const hasPermission = (role: UserRole | undefined, action: PermissionAction): boolean => {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.includes(action) || false;
};

export const isAdminAtLeast = (role: UserRole | undefined): boolean => {
  return role === 'super_admin' || role === 'admin';
};

export const isEditorAtLeast = (role: UserRole | undefined): boolean => {
  return role === 'super_admin' || role === 'admin' || role === 'editor';
};
