import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createInventoryAuditActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<InventoryAudit>,
    permissions?: ActionColumnPermissions,
) {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    const column: ColumnDef<InventoryAudit> = {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            const audit = row.original;

            if (!canWrite && !canDelete) {
                return null;
            }

            return (
                <div className="flex gap-2">
                    {canWrite && <Button iconName={iconNames.edit} onClick={() => onEdit(audit)} />}
                    {canDelete && <Button iconName={iconNames.trash} onClick={() => onDelete(audit._id)} />}
                </div>
            );
        },
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    };

    return column;
}
