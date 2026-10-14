import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createFacilityExpenseActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<FacilityExpense>,
    permissions?: ActionColumnPermissions,
) {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    const column: ColumnDef<FacilityExpense> = {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            const expense = row.original;

            if (!canWrite && !canDelete) {
                return null;
            }

            return (
                <div className="flex gap-2">
                    {canWrite && <Button iconName={iconNames.edit} onClick={() => onEdit(expense)} />}
                    {canDelete && <Button iconName={iconNames.trash} onClick={() => onDelete(expense._id)} />}
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
