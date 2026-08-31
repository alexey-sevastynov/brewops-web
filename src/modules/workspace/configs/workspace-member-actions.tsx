import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { WorkspaceMember } from "@/modules/workspace/configs/workspace-member-columns";

export function createWorkspaceMemberActionsColumn(
    onDelete: (id: string) => void,
    onEdit: (item: WorkspaceMember) => void,
) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => {
            const member = row.original;

            if (member.role.toLowerCase() === "owner") return null;

            return (
                <div className="flex justify-end gap-2">
                    <Button iconName={iconNames.edit} onClick={() => onEdit(member)} />
                    <Button
                        iconName={iconNames.trash}
                        variant={buttonVariantKeys.danger}
                        onClick={() => onDelete(member._id)}
                    />
                </div>
            );
        },
        size: 100,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<WorkspaceMember>;
}
