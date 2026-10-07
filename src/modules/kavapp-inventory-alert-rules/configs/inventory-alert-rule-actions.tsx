import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createInventoryAlertRuleActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<InventoryAlertRule>,
    permissions?: ActionColumnPermissions,
): ColumnDef<InventoryAlertRule> {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            if (!canWrite && !canDelete) return null;

            return (
                <div className="flex gap-2">
                    {canWrite && (
                        <Button
                            iconName={iconNames.edit}
                            title="Редагувати правило"
                            onClick={() => onEdit(row.original)}
                        />
                    )}
                    {canDelete && (
                        <Button
                            iconName={iconNames.trash}
                            title="Видалити правило"
                            onClick={() => onDelete(row.original._id)}
                        />
                    )}
                </div>
            );
        },
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    };
}
