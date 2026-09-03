import { ColumnDef } from "@tanstack/react-table";
import { userStatusKeys } from "@/modules/auth/enums/user-status-key";
import { UserProfile } from "@/modules/profile/types/user-profile";
import { Badge } from "@/shared/ui/badge/Badge";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";

const getStatusBadge = (status: UserProfile["userStatus"]) => {
    const statusConfig = {
        [userStatusKeys.active]: ["Активний", "bg-green-500/10", "text-green-500"],
        [userStatusKeys.blocked]: ["Заблокований", "bg-rose-500/10", "text-rose-500"],
        [userStatusKeys.pending]: ["Очікує", "bg-yellow-500/10", "text-yellow-500"],
        [userStatusKeys.deleted]: ["Видалений", "bg-slate-500/10", "text-slate-500"],
    } as const;
    const [label, color, textColor] = statusConfig[status] ?? [status, "bg-accent/20", "text-accent"];

    return (
        <Badge color={color} textColor={textColor}>
            {label}
        </Badge>
    );
};

const getVerificationBadge = (isVerified: boolean) => (
    <Badge
        color={isVerified ? "bg-green-500/10" : "bg-yellow-500/10"}
        textColor={isVerified ? "text-green-500" : "text-yellow-500"}
    >
        {isVerified ? "Підтверджений" : "Не підтверджений"}
    </Badge>
);

export const profileColumns: ColumnDef<UserProfile>[] = [
    createTableColumn({
        accessorKey: "_id",
        header: "ID",
        meta: { label: "ID", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "userId",
        header: "User ID",
        meta: { label: "User ID", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "userName",
        header: "Username",
        meta: { label: "Username", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "email",
        header: "Email",
        meta: { label: "Email", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "password",
        header: "Пароль",
        cell: () => <span className="text-muted-foreground">••••••••</span>,
        meta: { label: "Пароль", resourceFieldType: resourceFieldTypes.password, filterable: false },
    }),
    createTableColumn({
        accessorKey: "userStatus",
        header: "Статус",
        cell: ({ getValue }) => getStatusBadge(getValue<UserProfile["userStatus"]>()),
        meta: { label: "Статус", resourceFieldType: resourceFieldTypes.select, filterable: true },
    }),
    createTableColumn({
        accessorKey: "isVerified",
        header: "Верифікація",
        cell: ({ getValue }) => getVerificationBadge(getValue<boolean>()),
        meta: { label: "Верифікація", resourceFieldType: resourceFieldTypes.checkbox, filterable: false },
    }),
    createTableColumn({
        accessorKey: "blockReason",
        header: "Причина блокування",
        meta: { label: "Причина блокування", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "firstName",
        header: "Ім'я",
        meta: { label: "Ім'я", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "lastName",
        header: "Прізвище",
        meta: { label: "Прізвище", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "phoneNumber",
        header: "Телефон",
        meta: { label: "Телефон", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "createdAt",
        header: "Створено",
        meta: { label: "Створено", resourceFieldType: resourceFieldTypes.date, filterable: false },
    }),
    createTableColumn({
        accessorKey: "updatedAt",
        header: "Оновлено",
        meta: { label: "Оновлено", resourceFieldType: resourceFieldTypes.date, filterable: false },
    }),
];
