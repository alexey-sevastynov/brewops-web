import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { OwnerWithdrawal } from "@/modules/owner-withdrawal/types/owner-withdrawal";

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createOwnerWithdrawalActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<OwnerWithdrawal>,
    permissions?: ActionColumnPermissions,
) {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    const column: ColumnDef<OwnerWithdrawal> = {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            const withdrawal = row.original;

            if (!canWrite && !canDelete) {
                return null;
            }

            return (
                <div className="flex gap-2">
                    {canWrite && <Button iconName={iconNames.edit} onClick={() => onEdit(withdrawal)} />}
                    {canDelete && <Button iconName={iconNames.trash} onClick={() => onDelete(withdrawal._id)} />}
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
