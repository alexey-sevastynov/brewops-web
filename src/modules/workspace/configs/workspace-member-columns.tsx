import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/ui/badge/Badge";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { workspaceMemberProps } from "@/modules/workspace/constants/workspace-member-props";
import { workspaceMemberLabels } from "@/modules/workspace/constants/workspace-member-labels";

interface MemberUser {
    _id: string;
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface WorkspaceMember {
    _id: string;
    userId: MemberUser;
    role: "owner" | "admin" | "manager" | "barista";
    permissions: string[];
}

const RESOURCES = [
    { key: "daily-reports", label: "Звіти змін" },
    { key: "employees", label: "Співробітники" },
    { key: "expense-reports", label: "Звіти витрат" },
    { key: "inventory-audits", label: "Аудити складу" },
    { key: "facility-expenses", label: "Комунальні/Аренда" },
    { key: "owner-withdrawals", label: "Виведення коштів" },
    { key: "kavapp", label: "Інтеграція KavApp" },
    { key: "statistics", label: "Статистика" },
];

export const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
        case "owner":
            return (
                <Badge color="bg-indigo-500/10" textColor="text-indigo-500">
                    Власник
                </Badge>
            );
        case "admin":
            return (
                <Badge color="bg-rose-500/10" textColor="text-rose-500">
                    Адмін
                </Badge>
            );
        case "manager":
            return (
                <Badge color="bg-blue-500/10" textColor="text-blue-500">
                    Менеджер
                </Badge>
            );
        case "barista":
            return (
                <Badge color="bg-slate-500/10" textColor="text-slate-500">
                    Бариста
                </Badge>
            );
        default:
            return <Badge>{role}</Badge>;
    }
};

export const getPermissionsLabel = (member: WorkspaceMember) => {
    const normalizedRole = member.role.toLowerCase();

    if (normalizedRole === "owner" || normalizedRole === "admin" || normalizedRole === "manager") {
        return <span className="text-muted-foreground text-xs italic">Усі доступи</span>;
    }

    if (!member.permissions || member.permissions.length === 0) {
        return <span className="text-xs text-rose-500 italic">Немає доступів</span>;
    }

    return (
        <div className="flex max-w-xs flex-wrap gap-1">
            {member.permissions.map((p) => {
                const [res, action] = p.split(":");
                const resourceName = RESOURCES.find((r) => r.key === res)?.label || res;
                const actionLabel = action === "read" ? "Чит" : action === "write" ? "Зап" : action;
                return (
                    <Badge key={p} color="bg-card border border-border" textColor="text-foreground">
                        {resourceName} ({actionLabel})
                    </Badge>
                );
            })}
        </div>
    );
};

export const workspaceMemberColumns: ColumnDef<WorkspaceMember>[] = [
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
        cell: ({ getValue }) => getRoleBadge(getValue<string>()),
        meta: {
            label: workspaceMemberLabels.role,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<WorkspaceMember>({
        accessorKey: workspaceMemberProps.permissions,
        header: workspaceMemberLabels.permissions,
        cell: ({ row }) => getPermissionsLabel(row.original),
        meta: {
            label: workspaceMemberLabels.permissions,
            resourceFieldType: resourceFieldTypes.text,
            filterable: false,
        },
    }),
];
