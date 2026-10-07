import { ColumnDef } from "@tanstack/react-table";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { WorkspaceInvitation } from "@/modules/workspace/types/workspace-invitation";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { isAdminRole } from "@/modules/workspace/utils/guards";

export interface InvitationActionsOptions {
    isOwner?: boolean;
}

export function createInvitationActionsColumn(
    onDelete: VoidFunc<string>,
    onEdit: VoidFunc<WorkspaceInvitation>,
    options?: InvitationActionsOptions,
) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }: { row: { original: WorkspaceInvitation } }) => (
            <InvitationActionsCell
                invitation={row.original}
                onDelete={onDelete}
                onEdit={onEdit}
                isOwner={options?.isOwner}
            />
        ),
        size: 100,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<WorkspaceInvitation>;
}

interface InvitationActionsCellProps {
    invitation: WorkspaceInvitation;
    onDelete: VoidFunc<string>;
    onEdit: VoidFunc<WorkspaceInvitation>;
    isOwner?: boolean;
}

function InvitationActionsCell({ invitation, onDelete, onEdit, isOwner }: InvitationActionsCellProps) {
    if (!isOwner && isAdminRole(invitation.role)) {
        return null;
    }

    return (
        <div className="flex justify-end gap-2">
            <Button iconName={iconNames.edit} onClick={() => onEdit(invitation)} />
            <Button
                iconName={iconNames.trash}
                variant={buttonVariantKeys.danger}
                onClick={() => onDelete(invitation._id)}
            />
        </div>
    );
}
