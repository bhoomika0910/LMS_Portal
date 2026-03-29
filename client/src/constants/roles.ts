export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
} as const;

export type UserRoleValue = (typeof USER_ROLES)[keyof typeof USER_ROLES];
