import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { WorkspaceMember } from "@/modules/workspace/configs/workspace-member-columns";
import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { isOwnerRole } from "@/modules/workspace/utils/guards";

export interface WorkspaceMemberActionsOptions {
    currentUserId?: string | null;
    currentUserName?: string | null;
    isOwner?: boolean;
}

export function createWorkspaceMemberActionsColumn(
    onDelete: (id: string) => void,
    onEdit: (item: WorkspaceMember) => void,
    options?: WorkspaceMemberActionsOptions,
) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => (
            <WorkspaceMemberActionsCell
                member={row.original}
                onDelete={onDelete}
                onEdit={onEdit}
                currentUserId={options?.currentUserId}
                currentUserName={options?.currentUserName}
                isOwner={options?.isOwner}
            />
        ),
        size: 100,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<WorkspaceMember>;
}

interface WorkspaceMemberActionsCellProps {
    member: WorkspaceMember;
    onDelete: (id: string) => void;
    onEdit: (item: WorkspaceMember) => void;
    currentUserId?: string | null;
    currentUserName?: string | null;
    isOwner?: boolean;
}

function WorkspaceMemberActionsCell({
    member,
    onDelete,
    onEdit,
    currentUserId,
    currentUserName,
    isOwner,
}: WorkspaceMemberActionsCellProps) {
    if (isOwnerRole(member.role)) return null;

    const isSelf =
        Boolean(currentUserId && member.userId._id === currentUserId) ||
        Boolean(currentUserName && member.userId.userName === currentUserName);

    if (isSelf) return null;

    if (!isOwner && member.role === workspaceRoleKeys.admin) return null;

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
}
