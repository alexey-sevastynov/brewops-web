import { ColumnDef } from "@tanstack/react-table";
import { WorkspaceInvitation } from "@/modules/workspace/types/workspace-invitation";
import {
    getPermissionsLabel,
    getWorkspaceRoleBadge,
} from "@/modules/workspace/configs/workspace-member-columns";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { Badge } from "@/shared/ui/badge/Badge";
import { WorkspaceMember } from "@/modules/workspace/types/workspace-member";

export const createWorkspaceInvitationColumns = (
    coffeeShopMap?: Record<string, string>,
): ColumnDef<WorkspaceInvitation>[] => [
    {
        accessorKey: "email",
        header: "Email",
        meta: { label: "Email", resourceFieldType: resourceFieldTypes.text, filterable: true },
    },
    {
        accessorKey: "role",
        header: "Роль",
        cell: ({ getValue }) => getWorkspaceRoleBadge(getValue<WorkspaceRoleKey>()),
        meta: { label: "Роль", resourceFieldType: resourceFieldTypes.text, filterable: true },
    },
    {
        id: "permissions",
        header: "Доступ до кав'ярень",
        cell: ({ row }) =>
            getPermissionsLabel(row.original as unknown as WorkspaceMember, coffeeShopMap),
        meta: {
            label: "Доступ до кав'ярень",
            resourceFieldType: resourceFieldTypes.text,
            filterable: false,
        },
    },
    {
        accessorKey: "status",
        header: "Статус",
        cell: () => (
            <Badge color="bg-yellow-500/10" textColor="text-yellow-500">
                Очікує прийняття
            </Badge>
        ),
        meta: { label: "Статус", resourceFieldType: resourceFieldTypes.text, filterable: true },
    },
];

export const invitationColumns = createWorkspaceInvitationColumns();
