"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import {
    createWorkspaceMemberColumns,
    WorkspaceMember,
} from "@/modules/workspace/configs/workspace-member-columns";
import { createWorkspaceMemberActionsColumn } from "@/modules/workspace/configs/workspace-member-actions";
import { deleteWorkspaceMember, getWorkspaceMembers } from "@/modules/workspace/model/workspace-thunks";
import {
    selectCanManageWorkspaceMembers,
    selectIsWorkspaceOwner,
} from "@/modules/workspace/model/workspace-selectors";
import { getCoffeeShops } from "@/modules/coffee-shop/model/coffee-shop-thunks";
import { WorkspaceInviteModal } from "@/modules/workspace/components/workspace-invite-modal/WorkspaceInviteModal";
import { WorkspaceMemberEditModal } from "@/modules/workspace/components/workspace-members-table/WorkspaceMemberEditModal";

interface WorkspaceMembersModalsProps {
    isInviteOpen: boolean;
    onInviteOpenChange: VoidFunc<boolean>;
    isEditOpen: boolean;
    onEditOpenChange: VoidFunc<boolean>;
    editingMember: WorkspaceMember | null;
    workspaceId: string;
    workspaceShops: CoffeeShop[];
    isOwner: boolean;
}

export function WorkspaceMembersTable() {
    const dispatch = useAppDispatch();
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const members = useAppSelector((state) => state.workspace.members);
    const isLoading = useAppSelector((state) => state.workspace.isMembersLoading);
    const currentUserId = useAppSelector((state) => state.auth.userId);
    const currentUserName = useAppSelector((state) => state.auth.userName);
    const canManageMembers = useAppSelector(selectCanManageWorkspaceMembers);
    const isOwner = useAppSelector(selectIsWorkspaceOwner);

    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<WorkspaceMember | null>(null);

    const workspaceMembersState = useWorkspaceMembersState(workspaceId);

    if (!workspaceId) return null;

    return (
        <div>
            <ResourceTable<WorkspaceMember>
                title="Учасники робочого простору"
                data={members}
                isLoading={isLoading}
                columns={workspaceMembersState.columns}
                onDelete={
                    canManageMembers
                        ? async (memberId: string) => {
                              await dispatch(deleteWorkspaceMember({ workspaceId, memberId })).unwrap();
                          }
                        : undefined
                }
                deleteConfirmDescription={`Ви впевнені, що хочете вилучити цього учасника з команди? 
                    Його доступ до робочого простору буде закрито.`}
                createActionsColumn={
                    canManageMembers
                        ? (onDelete) =>
                              createWorkspaceMemberActionsColumn(
                                  onDelete,
                                  (member) => {
                                      setEditingMember(member);
                                      setIsEditOpen(true);
                                  },
                                  { currentUserId, currentUserName, isOwner },
                              )
                        : undefined
                }
                showPagination={false}
                showExport={false}
                showFilters={false}
                showColumnVisibility={false}
            >
                {canManageMembers && (
                    <Button
                        onClick={() => setIsInviteOpen(true)}
                        variant={buttonVariantKeys.primary}
                        text="Запросити учасника"
                        iconName="plus"
                        className="h-10 text-sm"
                    />
                )}
            </ResourceTable>

            {canManageMembers && (
                <WorkspaceMembersModals
                    isInviteOpen={isInviteOpen}
                    onInviteOpenChange={setIsInviteOpen}
                    isEditOpen={isEditOpen}
                    onEditOpenChange={(open) => {
                        setIsEditOpen(open);

                        if (!open) setEditingMember(null);
                    }}
                    editingMember={editingMember}
                    workspaceId={workspaceId}
                    workspaceShops={workspaceMembersState.workspaceShops}
                    isOwner={isOwner}
                />
            )}
        </div>
    );
}

function WorkspaceMembersModals({
    isInviteOpen,
    onInviteOpenChange,
    isEditOpen,
    onEditOpenChange,
    editingMember,
    workspaceId,
    workspaceShops,
    isOwner,
}: WorkspaceMembersModalsProps) {
    return (
        <>
            <WorkspaceInviteModal
                open={isInviteOpen}
                onOpenChange={onInviteOpenChange}
                workspaceId={workspaceId}
                coffeeShops={workspaceShops}
                isOwner={isOwner}
            />

            <WorkspaceMemberEditModal
                open={isEditOpen}
                onOpenChange={onEditOpenChange}
                member={editingMember}
                workspaceId={workspaceId}
                coffeeShops={workspaceShops}
                isOwner={isOwner}
            />
        </>
    );
}

function useWorkspaceMembersState(workspaceId: string | null) {
    const dispatch = useAppDispatch();
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);

    useEffect(() => {
        if (!workspaceId) return;

        dispatch(getWorkspaceMembers(workspaceId));

        if (coffeeShops.length === 0) {
            dispatch(getCoffeeShops(workspaceId));
        }
    }, [dispatch, workspaceId, coffeeShops.length]);

    const workspaceShops = useMemo(
        () => coffeeShops.filter((shop) => String(shop.workspaceId) === String(workspaceId)),
        [coffeeShops, workspaceId],
    );

    const coffeeShopMap = useMemo(
        () => Object.fromEntries(workspaceShops.map((shop) => [shop._id, shop.name])),
        [workspaceShops],
    );

    const columns = useMemo(() => createWorkspaceMemberColumns(coffeeShopMap), [coffeeShopMap]);

    return { workspaceShops, columns };
}
