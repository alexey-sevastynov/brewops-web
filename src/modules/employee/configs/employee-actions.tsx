import { RenderFunc, VoidFunc } from "@/shared/types/getter-setter-functions";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/modules/employee/types/employee";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";

function createActionsColumn<TData>(renderActions: RenderFunc<TData>) {
    const actionsColumn: ColumnDef<TData> = {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => <div className="flex items-center gap-2">{renderActions(row.original)}</div>,
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    };

    return actionsColumn;
}

interface ActionColumnPermissions {
    canWrite?: boolean;
    canDelete?: boolean;
}

export function createEmployeeActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<Employee>,
    permissions?: ActionColumnPermissions,
) {
    const canWrite = permissions?.canWrite ?? true;
    const canDelete = permissions?.canDelete ?? true;

    return createActionsColumn<Employee>((employee) => {
        if (!canWrite && !canDelete) return null;

        return (
            <>
                {canWrite && <Button iconName={iconNames.edit} onClick={() => onEdit(employee)} />}
                {canDelete && <Button iconName={iconNames.trash} onClick={() => onDelete(employee._id)} />}
            </>
        );
    });
}
