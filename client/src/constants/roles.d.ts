export declare const USER_ROLES: {
    readonly STUDENT: "student";
    readonly INSTRUCTOR: "instructor";
    readonly ADMIN: "admin";
};
export type UserRoleValue = (typeof USER_ROLES)[keyof typeof USER_ROLES];
