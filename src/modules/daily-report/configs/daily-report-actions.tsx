import { ColumnDef } from "@tanstack/react-table";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createDailyReportActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<DailyReport>,
    permissions?: ActionColumnPermissions,
) {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    const column: ColumnDef<DailyReport> = {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            const report = row.original;

            if (!canWrite && !canDelete) {
                return null;
            }

            return (
                <div className="flex gap-2">
                    {canWrite && <Button iconName={iconNames.edit} onClick={() => onEdit(report)} />}
                    {canDelete && <Button iconName={iconNames.trash} onClick={() => onDelete(report._id)} />}
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
