import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { User } from "@/modules/user/types/user";
import { VoidFunc } from "@/shared/types/getter-setter-functions";

interface UserActionsCellProps {
    user: User;
    onDelete: VoidFunc<string>;
    onEdit: VoidFunc<User>;
}

export function createUserActionsColumn(onDelete: (id: string) => void, onEdit: (profile: User) => void) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => <UserActionsCell user={row.original} onDelete={onDelete} onEdit={onEdit} />,
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<User>;
}

function UserActionsCell({ user, onDelete, onEdit }: UserActionsCellProps) {
    return (
        <div className="flex justify-end gap-2">
            <Button iconName={iconNames.edit} onClick={() => onEdit(user)} />
            <Button iconName={iconNames.trash} variant="danger" onClick={() => onDelete(user._id)} />
        </div>
    );
}
