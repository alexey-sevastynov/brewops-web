import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/ui/badge/Badge";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { workspaceMemberProps } from "@/modules/workspace/constants/workspace-member-props";
import { workspaceMemberLabels } from "@/modules/workspace/constants/workspace-member-labels";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { workspaceRoleLabels } from "@/modules/workspace/constants/workspace-role-labels";
import { WithObjectId } from "@/shared/types/with-object-id";

interface MemberUser {
    _id: string;
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface CoffeeShopAccessItem {
    coffeeShopId: string;
    role?: string;
    permissions: string[];
}

export interface WorkspaceMember extends WithObjectId {
    userId: MemberUser;
    role: WorkspaceRoleKey;
    permissions?: string[];
    coffeeShopAccess?: CoffeeShopAccessItem[];
}

import { ResourceName } from "@/shared/constants/resource-names";
import { resourceLabels } from "@/shared/constants/resource-labels";
import {
    PermissionAction,
    permissionActionLabels,
} from "@/shared/enums/permission-action";

export const getWorkspaceRoleBadge = (role: WorkspaceRoleKey) => {
    switch (role) {
        case workspaceRoleKeys.owner:
            return (
                <Badge color="bg-red-500/10" textColor="text-red-500">
                    {workspaceRoleLabels.owner}
                </Badge>
            );

        case workspaceRoleKeys.admin:
            return (
                <Badge color="bg-rose-500/10" textColor="text-rose-500">
                    {workspaceRoleLabels.admin}
                </Badge>
            );
        case workspaceRoleKeys.custom:
            return (
                <Badge color="bg-yellow-500/10" textColor="text-yellow-500">
                    {workspaceRoleLabels.custom}
                </Badge>
            );
        default:
            return <Badge>{role}</Badge>;
    }
};

export const getPermissionsLabel = (member: WorkspaceMember, coffeeShopMap?: Record<string, string>) => {
    const normalizedRole = member.role.toLowerCase();

    if (normalizedRole === "owner" || normalizedRole === "admin") {
        return (
            <span className="text-muted-foreground text-xs italic">Усі кав&apos;ярні (Повний доступ)</span>
        );
    }

    if (member.coffeeShopAccess && member.coffeeShopAccess.length > 0) {
        return (
            <div className="flex max-w-sm flex-col gap-1.5">
                {member.coffeeShopAccess.map((access) => {
                    const shopName = coffeeShopMap?.[access.coffeeShopId] || "Кав'ярня";
                    return (
                        <div
                            key={access.coffeeShopId}
                            className="bg-card/70 border-border/80 flex flex-col gap-1 rounded-md border p-1.5 text-xs"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-foreground max-w-[140px] truncate font-semibold">
                                    {shopName}
                                </span>
                                <Badge color="bg-blue-500/10" textColor="text-blue-500">
                                    Настроюваний
                                </Badge>
                            </div>
                            {access.permissions?.length > 0 && (
                                <div className="mt-0.5 flex flex-wrap gap-1">
                                    {access.permissions.map((p) => {
                                        const [res, action] = p.split(":");
                                        const resourceName =
                                            resourceLabels[res as ResourceName] || res;
                                        const actionLabel =
                                            permissionActionLabels[action as PermissionAction] || action;
                                        return (
                                            <span
                                                key={p}
                                                className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px]"
                                            >
                                                {resourceName} ({actionLabel})
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                            {(!access.permissions || access.permissions.length === 0) && (
                                <span className="text-muted-foreground text-[10px] italic">
                                    Без призначених прав
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    if (!member.permissions || member.permissions.length === 0) {
        return <span className="text-xs text-rose-500 italic">Немає доступу до кав&apos;ярень</span>;
    }

    return (
        <div className="flex max-w-xs flex-wrap gap-1">
            {member.permissions.map((p) => {
                const [res, action] = p.split(":");
                const resourceName =
                    resourceLabels[res as ResourceName] || res;
                const actionLabel =
                    permissionActionLabels[action as PermissionAction] || action;
                return (
                    <Badge key={p} color="bg-card border border-border" textColor="text-foreground">
                        {resourceName} ({actionLabel})
                    </Badge>
                );
            })}
        </div>
    );
};

export const createWorkspaceMemberColumns = (
    coffeeShopMap?: Record<string, string>,
): ColumnDef<WorkspaceMember>[] => [
    createTableColumn<WorkspaceMember>({
        accessorFn: (row) => {
            const user = row.userId;
            return [user.firstName, user.lastName].filter(Boolean).join(" ") || user.userName;
        },
        header: workspaceMemberLabels.userName,
        cell: ({ row }) => {
            const user = row.original.userId;
            const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.userName;
            return (
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold uppercase">
                        {user.userName.substring(0, 2)}
                    </div>
                    <div>
                        <div className="font-semibold">{fullName}</div>
                        <div className="text-muted-foreground text-[10px]">@{user.userName}</div>
                    </div>
                </div>
            );
        },
        meta: {
            label: workspaceMemberLabels.userName,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<WorkspaceMember>({
        accessorFn: (row) => row.userId.email,
        header: workspaceMemberLabels.email,
        meta: {
            label: workspaceMemberLabels.email,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<WorkspaceMember>({
        accessorKey: workspaceMemberProps.role,
        header: workspaceMemberLabels.role,
        cell: ({ getValue }) => getWorkspaceRoleBadge(getValue<WorkspaceRoleKey>()),
        meta: {
            label: workspaceMemberLabels.role,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<WorkspaceMember>({
        accessorKey: workspaceMemberProps.permissions,
        header: workspaceMemberLabels.permissions,
        cell: ({ row }) => getPermissionsLabel(row.original, coffeeShopMap),
        meta: {
            label: workspaceMemberLabels.permissions,
            resourceFieldType: resourceFieldTypes.text,
            filterable: false,
        },
    }),
];

export const workspaceMemberColumns = createWorkspaceMemberColumns();
