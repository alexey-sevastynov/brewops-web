import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { UserProfile } from "@/modules/profile/types/user-profile";

export function createProfileActionsColumn(
    onDelete: (id: string) => void,
    onEdit: (profile: UserProfile) => void,
) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => (
            <div className="flex justify-end gap-2">
                <Button iconName={iconNames.edit} onClick={() => onEdit(row.original)} />
                <Button
                    iconName={iconNames.trash}
                    variant="danger"
                    onClick={() => onDelete(row.original._id)}
                />
            </div>
        ),
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<UserProfile>;
}
