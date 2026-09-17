/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { apiClient } from "@/shared/lib/axios";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { MRInput } from "@/shared/ui/input/Input";
import { Select } from "@/shared/ui/select/Select";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { Badge } from "@/shared/ui/badge/Badge";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import {
    createWorkspaceMemberColumns,
    getWorkspaceRoleBadge,
    WorkspaceMember,
    CoffeeShopAccessItem,
} from "@/modules/workspace/configs/workspace-member-columns";
import { createWorkspaceMemberActionsColumn } from "@/modules/workspace/configs/workspace-member-actions";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import {
    CoffeeShopAccessPicker,
    ShopAccessItemState,
} from "@/modules/workspace/components/CoffeeShopAccessPicker";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { resourceNames } from "@/shared/constants/resource-names";
import { permissionActions } from "@/shared/enums/permission-action";

interface WorkspaceInvitation {
    _id: string;
    email: string;
    role: string;
    permissions?: string[];
    coffeeShopAccess?: CoffeeShopAccessItem[];
    status: string;
}

const invitationColumns: ColumnDef<WorkspaceInvitation>[] = [
    {
        accessorKey: "email",
        header: "Email",
        meta: { label: "Email", resourceFieldType: resourceFieldTypes.text, filterable: true },
    },
    {
        accessorKey: "role",
        header: "Роль",
        cell: ({ getValue }) => getWorkspaceRoleBadge(getValue<WorkspaceRoleKey>()),
        meta: { label: "Роль", resourceFieldType: resourceFieldTypes.text, filterable: true },
    },
    {
        accessorKey: "status",
        header: "Статус",
        cell: () => (
            <Badge color="bg-yellow-500/10" textColor="text-yellow-500">
                Надіслано
            </Badge>
        ),
        meta: { label: "Статус", resourceFieldType: resourceFieldTypes.text, filterable: true },
    },
];

function createInvitationActionsColumn(
    onDelete: (id: string) => void,
    onEdit: (invitation: WorkspaceInvitation) => void,
    options?: { isOwner?: boolean },
) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }: { row: { original: WorkspaceInvitation } }) => {
            const invitation = row.original;

            if (!options?.isOwner && invitation.role.toLowerCase() === "admin") {
                return null;
            }

            return (
                <div className="flex justify-end gap-2">
                    <Button iconName={iconNames.edit} onClick={() => onEdit(row.original)} />
                    <Button
                        iconName={iconNames.trash}
                        variant={buttonVariantKeys.danger}
                        onClick={() => onDelete(row.original._id)}
                    />
                </div>
            );
        },
        size: 100,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<WorkspaceInvitation>;
}

// eslint-disable-next-line complexity
export function WorkspaceMembersTable() {
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
    const [loading, setLoading] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"admin" | "custom">("custom");
    const [inviteShopAccess, setInviteShopAccess] = useState<ShopAccessItemState[]>([]);
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError, setInviteError] = useState("");
    const [editingInvitation, setEditingInvitation] = useState<WorkspaceInvitation | null>(null);
    const [isInvitationEditOpen, setIsInvitationEditOpen] = useState(false);
    const [invitationEditEmail, setInvitationEditEmail] = useState("");
    const [invitationEditRole, setInvitationEditRole] = useState<"admin" | "custom">("custom");
    const [invitationEditShopAccess, setInvitationEditShopAccess] = useState<ShopAccessItemState[]>([]);
    const [invitationEditLoading, setInvitationEditLoading] = useState(false);
    const [invitationEditError, setInvitationEditError] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<WorkspaceMember | null>(null);
    const [editRole, setEditRole] = useState<"admin" | "custom">("custom");
    const [editShopAccess, setEditShopAccess] = useState<ShopAccessItemState[]>([]);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");

    const currentUserId = useAppSelector((state) => state.auth.userId);
    const currentUserName = useAppSelector((state) => state.auth.userName);
    const currentWorkspace = useAppSelector((state) =>
        state.workspace.workspaces.find((w) => w._id === workspaceId),
    );

    const currentMember = useMemo(() => {
        return members.find(
            (m) =>
                (currentUserId && m.userId._id === currentUserId) ||
                (currentUserName && m.userId.userName === currentUserName),
        );
    }, [members, currentUserId, currentUserName]);

    const canManageMembers = Boolean(
        currentWorkspace?.isOwner ||
            currentWorkspace?.role === "owner" ||
            currentWorkspace?.role === "admin" ||
            currentMember?.role === "owner" ||
            currentMember?.role === "admin",
    );

    const isCurrentUserOwner = Boolean(
        currentWorkspace?.isOwner || currentWorkspace?.role === "owner" || currentMember?.role === "owner",
    );

    const fetchData = async () => {
        if (!workspaceId) return;

        setLoading(true);

        try {
            const [membersRes, shopsRes] = await Promise.all([
                apiClient.get<WorkspaceMember[]>(`/workspaces/${workspaceId}/members`),
                apiClient.get<CoffeeShop[]>(`/coffee-shops`),
            ]);
            setMembers(membersRes.data);

            const currentWorkspaceShops = shopsRes.data.filter(
                (shop) => String(shop.workspaceId) === String(workspaceId),
            );
            setCoffeeShops(currentWorkspaceShops);

            try {
                const invitesRes = await apiClient.get<WorkspaceInvitation[]>(
                    `/workspaces/${workspaceId}/invitations`,
                );
                setInvitations(invitesRes.data);
            } catch {
                setInvitations([]);
            }
        } catch (error) {
            console.error("Failed to load workspace members or coffee shops", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [workspaceId]);

    const coffeeShopMap = useMemo(
        () => Object.fromEntries(coffeeShops.map((s) => [s._id, s.name])),
        [coffeeShops],
    );

    const memberColumns = useMemo(() => createWorkspaceMemberColumns(coffeeShopMap), [coffeeShopMap]);

    const handleOpenInvite = () => {
        setInviteEmail("");
        setInviteRole("custom");

        if (coffeeShops.length > 0) {
            setInviteShopAccess([
                {
                    coffeeShopId: coffeeShops[0]._id,
                    role: "custom",
                    permissions: [
                        `${resourceNames.dailyReports}:${permissionActions.read}`,
                        `${resourceNames.dailyReports}:${permissionActions.write}`,
                        `${resourceNames.expenseReports}:${permissionActions.read}`,
                        `${resourceNames.expenseReports}:${permissionActions.write}`,
                    ],
                },
            ]);
        } else {
            setInviteShopAccess([]);
        }

        setInviteError("");
        setIsInviteOpen(true);
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId) return;

        setInviteLoading(true);
        setInviteError("");

        try {
            await apiClient.post(`/workspaces/${workspaceId}/invitations`, {
                email: inviteEmail,
                role: inviteRole,
                coffeeShopAccess: inviteRole === "admin" ? [] : inviteShopAccess,
            });
            setIsInviteOpen(false);
            setInviteEmail("");
            setInviteShopAccess([]);
            fetchData();
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Не вдалося надіслати запрошення.";
            setInviteError(message);
        } finally {
            setInviteLoading(false);
        }
    };

    const handleCancelInvitation = async (invitationId: string) => {
        if (!workspaceId) return;

        // eslint-disable-next-line no-alert
        if (!confirm("Ви впевнені, що хочете скасувати це запрошення?")) return;

        try {
            await apiClient.delete(`/workspaces/${workspaceId}/invitations/${invitationId}`);
            fetchData();
        } catch (error) {
            console.error("Failed to cancel invitation", error);
        }
    };

    const openInvitationEditModal = (invitation: WorkspaceInvitation) => {
        setEditingInvitation(invitation);
        setInvitationEditEmail(invitation.email);
        const role = (invitation.role?.toLowerCase() === "admin" ? "admin" : "custom") as "admin" | "custom";
        setInvitationEditRole(role);

        if (invitation.coffeeShopAccess && invitation.coffeeShopAccess.length > 0) {
            setInvitationEditShopAccess(invitation.coffeeShopAccess);
        } else if (coffeeShops.length > 0 && role !== "admin") {
            setInvitationEditShopAccess([
                {
                    coffeeShopId: coffeeShops[0]._id,
                    role: "custom",
                    permissions: invitation.permissions || [],
                },
            ]);
        } else {
            setInvitationEditShopAccess([]);
        }

        setInvitationEditError("");
        setIsInvitationEditOpen(true);
    };

    const handleUpdateInvitation = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId || !editingInvitation) return;

        setInvitationEditLoading(true);
        setInvitationEditError("");

        try {
            await apiClient.patch(`/workspaces/${workspaceId}/invitations/${editingInvitation._id}`, {
                email: invitationEditEmail,
                role: invitationEditRole,
                coffeeShopAccess: invitationEditRole === "admin" ? [] : invitationEditShopAccess,
            });
            setIsInvitationEditOpen(false);
            setEditingInvitation(null);
            fetchData();
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Не вдалося оновити запрошення.";
            setInvitationEditError(message);
        } finally {
            setInvitationEditLoading(false);
        }
    };

    const openEditModal = (member: WorkspaceMember) => {
        setEditingMember(member);
        const normalizedRole = member.role.toLowerCase();
        const role = normalizedRole === "admin" ? "admin" : "custom";
        setEditRole(role);

        if (member.coffeeShopAccess && member.coffeeShopAccess.length > 0) {
            setEditShopAccess(member.coffeeShopAccess);
        } else if (coffeeShops.length > 0 && role !== "admin") {
            setEditShopAccess(
                coffeeShops.map((shop) => ({
                    coffeeShopId: shop._id,
                    role: "custom",
                    permissions: member.permissions || [],
                })),
            );
        } else {
            setEditShopAccess([]);
        }

        setEditError("");
        setIsEditOpen(true);
    };

    const handleUpdateMember = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId || !editingMember) return;

        setEditLoading(true);
        setEditError("");

        try {
            await apiClient.patch(`/workspaces/${workspaceId}/members/${editingMember._id}`, {
                role: editRole,
                coffeeShopAccess: editRole === "admin" ? [] : editShopAccess,
            });
            setIsEditOpen(false);
            setEditingMember(null);
            fetchData();
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                "Не вдалося оновити учасника.";
            setEditError(message);
        } finally {
            setEditLoading(false);
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        if (!workspaceId) return;

        // eslint-disable-next-line no-alert
        if (!confirm("Ви впевнені, що хочете вилучити цього учасника з команди?")) return;

        try {
            await apiClient.delete(`/workspaces/${workspaceId}/members/${memberId}`);

            fetchData();
        } catch (error) {
            console.error("Failed to remove member", error);
        }
    };

    if (!workspaceId) return null;

    return (
        <div>
            <ResourceTable<WorkspaceMember>
                title="Учасники робочого простору"
                data={members}
                isLoading={loading}
                columns={memberColumns}
                createActionsColumn={
                    canManageMembers
                        ? () =>
                              createWorkspaceMemberActionsColumn(handleRemoveMember, openEditModal, {
                                  currentUserId,
                                  currentUserName,
                                  isOwner: isCurrentUserOwner,
                              })
                        : undefined
                }
                showPagination={false}
                showExport={false}
                showFilters={false}
                showColumnVisibility={false}
            >
                {canManageMembers && (
                    <Button
                        onClick={handleOpenInvite}
                        variant={buttonVariantKeys.primary}
                        text="Запросити учасника"
                        iconName="plus"
                        className="h-10 text-sm"
                    />
                )}
            </ResourceTable>

            {canManageMembers && (
                <ResourceTable<WorkspaceInvitation>
                    title="Очікують прийняття"
                    data={invitations}
                    isLoading={loading}
                    columns={invitationColumns}
                    onDelete={handleCancelInvitation}
                    createActionsColumn={(onDelete) =>
                        createInvitationActionsColumn(onDelete, openInvitationEditModal, {
                            isOwner: isCurrentUserOwner,
                        })
                    }
                    showPagination={false}
                    showExport={false}
                    showFilters={false}
                    showColumnVisibility={false}
                />
            )}

            {canManageMembers && (
                <>
                    <ModalWindow
                        open={isInviteOpen}
                        onOpenChange={setIsInviteOpen}
                        title="Запросити члена команди"
                        description="Надішліть запрошення на email для підключення до робочого простору кав'ярні."
                        size="lg"
                    >
                        <form onSubmit={handleInvite} className="space-y-6">
                            {inviteError && (
                                <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
                                    <ShieldAlert size={18} />
                                    {inviteError}
                                </div>
                            )}

                            <MRInput
                                label="Email користувача"
                                type="email"
                                required
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="example@gmail.com"
                            />

                            <div className="space-y-2">
                                <label className="text-muted-foreground text-xs font-semibold uppercase">
                                    Роль у просторі
                                </label>
                                <Select
                                    value={inviteRole}
                                    onValueChange={(val) => setInviteRole(val as "admin" | "custom")}
                                    options={
                                        isCurrentUserOwner
                                            ? [
                                                  {
                                                      value: "admin",
                                                      label: "Адміністратор (повний доступ до всього)",
                                                  },
                                                  {
                                                      value: "custom",
                                                      label: "Настроюваний доступ (окремі права для кав'ярень)",
                                                  },
                                              ]
                                            : [
                                                  {
                                                      value: "custom",
                                                      label: "Настроюваний доступ (окремі права для кав'ярень)",
                                                  },
                                              ]
                                    }
                                />
                            </div>

                            <CoffeeShopAccessPicker
                                coffeeShops={coffeeShops}
                                workspaceRole={inviteRole}
                                value={inviteShopAccess}
                                onChange={setInviteShopAccess}
                            />

                            <div className="border-border/40 mt-6 flex justify-end gap-3 border-t pt-2">
                                <Button
                                    type="button"
                                    variant={buttonVariantKeys.secondary}
                                    onClick={() => setIsInviteOpen(false)}
                                    text="Скасувати"
                                    className="h-10 text-sm"
                                />
                                <Button
                                    type="submit"
                                    variant={buttonVariantKeys.primary}
                                    loading={inviteLoading}
                                    text="Запросити"
                                    className="h-10 text-sm"
                                />
                            </div>
                        </form>
                    </ModalWindow>

                    <ModalWindow
                        open={isInvitationEditOpen}
                        onOpenChange={(open) => {
                            setIsInvitationEditOpen(open);

                            if (!open) setEditingInvitation(null);
                        }}
                        title="Редагування запрошення"
                        description={`Змініть email, роль та доступи для ${editingInvitation?.email ?? "учасника"}.`}
                        size="lg"
                    >
                        <form onSubmit={handleUpdateInvitation} className="space-y-6">
                            {invitationEditError && (
                                <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
                                    <ShieldAlert size={18} />
                                    {invitationEditError}
                                </div>
                            )}

                            <MRInput
                                label="Email користувача"
                                type="email"
                                required
                                value={invitationEditEmail}
                                onChange={(e) => setInvitationEditEmail(e.target.value)}
                            />

                            <div className="space-y-2">
                                <label className="text-muted-foreground text-xs font-semibold uppercase">
                                    Роль у команді
                                </label>
                                <Select
                                    value={invitationEditRole}
                                    onValueChange={(val) => setInvitationEditRole(val as "admin" | "custom")}
                                    options={
                                        isCurrentUserOwner
                                            ? [
                                                  {
                                                      value: "admin",
                                                      label: "Адміністратор (повний доступ до всього)",
                                                  },
                                                  {
                                                      value: "custom",
                                                      label: "Настроюваний доступ (окремі права для кав'ярень)",
                                                  },
                                              ]
                                            : [
                                                  {
                                                      value: "custom",
                                                      label: "Настроюваний доступ (окремі права для кав'ярень)",
                                                  },
                                              ]
                                    }
                                />
                            </div>

                            <CoffeeShopAccessPicker
                                coffeeShops={coffeeShops}
                                workspaceRole={invitationEditRole}
                                value={invitationEditShopAccess}
                                onChange={setInvitationEditShopAccess}
                            />

                            <div className="border-border/40 mt-6 flex justify-end gap-3 border-t pt-2">
                                <Button
                                    type="button"
                                    variant={buttonVariantKeys.secondary}
                                    onClick={() => setIsInvitationEditOpen(false)}
                                    text="Скасувати"
                                    className="h-10 text-sm"
                                />
                                <Button
                                    type="submit"
                                    variant={buttonVariantKeys.primary}
                                    loading={invitationEditLoading}
                                    text="Зберегти"
                                    className="h-10 text-sm"
                                />
                            </div>
                        </form>
                    </ModalWindow>

                    <ModalWindow
                        open={isEditOpen}
                        onOpenChange={(open) => {
                            setIsEditOpen(open);

                            if (!open) setEditingMember(null);
                        }}
                        title="Налаштування доступу"
                        description={`Редагування ролі та доступів для ${editingMember?.userId.email}`}
                        size="lg"
                    >
                        <form onSubmit={handleUpdateMember} className="space-y-6">
                            {editError && (
                                <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
                                    <ShieldAlert size={18} />
                                    {editError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-muted-foreground text-xs font-semibold uppercase">
                                    Роль у команді
                                </label>
                                <Select
                                    value={editRole}
                                    onValueChange={(val) => setEditRole(val as "admin" | "custom")}
                                    options={
                                        isCurrentUserOwner
                                            ? [
                                                  {
                                                      value: "admin",
                                                      label: "Адміністратор (повний доступ до всього)",
                                                  },
                                                  {
                                                      value: "custom",
                                                      label: "Настроюваний доступ (окремі права для кав'ярень)",
                                                  },
                                              ]
                                            : [
                                                  {
                                                      value: "custom",
                                                      label: "Настроюваний доступ (окремі права для кав'ярень)",
                                                  },
                                              ]
                                    }
                                />
                            </div>

                            <CoffeeShopAccessPicker
                                coffeeShops={coffeeShops}
                                workspaceRole={editRole}
                                value={editShopAccess}
                                onChange={setEditShopAccess}
                            />

                            <div className="border-border/40 mt-6 flex justify-end gap-3 border-t pt-2">
                                <Button
                                    type="button"
                                    variant={buttonVariantKeys.secondary}
                                    onClick={() => setIsEditOpen(false)}
                                    text="Скасувати"
                                    className="h-10 text-sm"
                                />
                                <Button
                                    type="submit"
                                    variant={buttonVariantKeys.primary}
                                    loading={editLoading}
                                    text="Зберегти"
                                    className="h-10 text-sm"
                                />
                            </div>
                        </form>
                    </ModalWindow>
                </>
            )}
        </div>
    );
}
