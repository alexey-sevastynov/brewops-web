import { ColumnDef } from "@tanstack/react-table";
import { Workspace } from "@/modules/workspace/workspace-types";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { ResourceField } from "@/shared/types/resource-field";
import { BadgeCell } from "@/shared/ui/table/table-body/table-row/badge-cell/BadgeCell";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";

const planLabels = { free: "FREE", pro: "PRO", business: "BUSINESS" };

export const workspaceColumns: ColumnDef<Workspace>[] = [
    createTableColumn({
        accessorKey: "name",
        header: "Назва",
        meta: { label: "Назва", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "planKey",
        header: "Тариф",
        cell: (cellInfo) => <BadgeCell cellInfo={cellInfo} labels={planLabels} />,
        meta: { label: "Тариф", resourceFieldType: resourceFieldTypes.select, filterable: true },
    }),
];

export const workspaceFormFields: ResourceField<Workspace>[] = [
    { name: "name", label: "Назва workspace", type: resourceFieldTypes.text, required: true },
];

export function createWorkspaceActionsColumn(_: (id: string) => void, onEdit: (item: Workspace) => void) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => <Button iconName={iconNames.edit} onClick={() => onEdit(row.original)} />,
        size: 80,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<Workspace>;
}
