"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { WorkspaceInvitation } from "@/modules/workspace/types/workspace-invitation";
import { createWorkspaceInvitationColumns } from "@/modules/workspace/configs/invitation-columns";
import { createInvitationActionsColumn } from "@/modules/workspace/configs/invitation-actions-column";
import {
    deleteWorkspaceInvitation,
    getWorkspaceInvitations,
} from "@/modules/workspace/model/workspace-thunks";
import {
    selectCanManageWorkspaceMembers,
    selectIsWorkspaceOwner,
} from "@/modules/workspace/model/workspace-selectors";
import { WorkspaceInvitationEditModal } from "@/modules/workspace/components/workspace-invite-modal/WorkspaceInvitationEditModal";

export function WorkspaceInvitationsTable() {
    const dispatch = useAppDispatch();
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const invitations = useAppSelector((state) => state.workspace.invitations);
    const isLoading = useAppSelector((state) => state.workspace.isInvitationsLoading);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const canManageMembers = useAppSelector(selectCanManageWorkspaceMembers);
    const isOwner = useAppSelector(selectIsWorkspaceOwner);

    const [editingInvitation, setEditingInvitation] = useState<WorkspaceInvitation | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        if (!workspaceId || !canManageMembers) return;

        dispatch(getWorkspaceInvitations(workspaceId));
    }, [dispatch, workspaceId, canManageMembers]);

    const workspaceShops = useMemo(
        () => coffeeShops.filter((shop) => shop.workspaceId === workspaceId),
        [coffeeShops, workspaceId],
    );

    const coffeeShopMap = useMemo(
        () => Object.fromEntries(workspaceShops.map((shop) => [shop._id, shop.name])),
        [workspaceShops],
    );

    const columns = useMemo(() => createWorkspaceInvitationColumns(coffeeShopMap), [coffeeShopMap]);

    if (!workspaceId || !canManageMembers) return null;

    return (
        <div>
            <ResourceTable<WorkspaceInvitation>
                title="Очікують прийняття"
                data={invitations}
                isLoading={isLoading}
                columns={columns}
                onDelete={async (invitationId) => {
                    await dispatch(deleteWorkspaceInvitation({ workspaceId, invitationId })).unwrap();
                }}
                deleteConfirmDescription={
                    "Ви впевнені, що хочете скасувати це запрошення? Посилання для входу стане недійсним."
                }
                createActionsColumn={(onDelete) =>
                    createInvitationActionsColumn(
                        onDelete,
                        (invitation) => {
                            setEditingInvitation(invitation);
                            setIsEditOpen(true);
                        },
                        { isOwner },
                    )
                }
                showPagination={false}
                showExport={false}
                showFilters={false}
                showColumnVisibility={false}
            />

            <WorkspaceInvitationEditModal
                open={isEditOpen}
                onOpenChange={(open) => {
                    setIsEditOpen(open);

                    if (!open) setEditingInvitation(null);
                }}
                invitation={editingInvitation}
                workspaceId={workspaceId}
                coffeeShops={workspaceShops}
                isOwner={isOwner}
            />
        </div>
    );
}
