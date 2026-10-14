export const permissionActions = {
    read: "read",
    write: "write",
    delete: "delete",
} as const;

export type PermissionAction = (typeof permissionActions)[keyof typeof permissionActions];

export const permissionActionLabels: Record<PermissionAction, string> = {
    [permissionActions.read]: "Чит.",
    [permissionActions.write]: "Ред.",
    [permissionActions.delete]: "Вид.",
} as const;
