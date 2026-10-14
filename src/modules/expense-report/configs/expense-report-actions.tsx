import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createExpenseReportActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<ExpenseReport>,
    permissions?: ActionColumnPermissions,
) {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    const column: ColumnDef<ExpenseReport> = {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            if (!canWrite && !canDelete) return null;

            return (
                <div className="flex gap-2">
                    {canWrite && <Button iconName={iconNames.edit} onClick={() => onEdit(row.original)} />}
                    {canDelete && (
                        <Button iconName={iconNames.trash} onClick={() => onDelete(row.original._id)} />
                    )}
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
