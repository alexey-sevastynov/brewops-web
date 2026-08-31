/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */

"use client";

import { useEffect, useState } from "react";
import { Shield, Mail, ShieldAlert, X } from "lucide-react";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { apiClient } from "@/shared/lib/axios";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { MRInput } from "@/shared/ui/input/Input";
import { Select } from "@/shared/ui/select/Select";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { Badge } from "@/shared/ui/badge/Badge";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import {
    workspaceMemberColumns,
    getRoleBadge,
    WorkspaceMember,
} from "@/modules/workspace/configs/workspace-member-columns";
import { createWorkspaceMemberActionsColumn } from "@/modules/workspace/configs/workspace-member-actions";

interface WorkspaceInvitation {
    _id: string;
    email: string;
    role: string;
    permissions: string[];
    status: string;
}

const RESOURCES = [
    { key: "daily-reports", label: "Звіти змін" },
    { key: "employees", label: "Співробітники" },
    { key: "expense-reports", label: "Звіти витрат" },
    { key: "inventory-audits", label: "Аудити складу" },
    { key: "facility-expenses", label: "Комунальні/Аренда" },
    { key: "owner-withdrawals", label: "Виведення коштів" },
    { key: "kavapp", label: "Інтеграція KavApp" },
    { key: "statistics", label: "Статистика" },
];

export function WorkspaceMembersTable() {
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);

    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const [invitations, setInvitations] = useState<WorkspaceInvitation[]>([]);
    const [loading, setLoading] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"admin" | "manager" | "barista">("barista");
    const [invitePermissions, setInvitePermissions] = useState<string[]>([]);
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError, setInviteError] = useState("");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<WorkspaceMember | null>(null);
    const [editRole, setEditRole] = useState<"admin" | "manager" | "barista">("barista");
    const [editPermissions, setEditPermissions] = useState<string[]>([]);
    const [editLoading, setEditLoading] = useState(false);

    const fetchData = async () => {
        if (!workspaceId) return;

        setLoading(true);

        try {
            const [membersRes, invitesRes] = await Promise.all([
                apiClient.get<WorkspaceMember[]>(`/workspaces/${workspaceId}/members`),
                apiClient.get<WorkspaceInvitation[]>(`/workspaces/${workspaceId}/invitations`),
            ]);
            setMembers(membersRes.data);
            setInvitations(invitesRes.data);
        } catch (error) {
            console.error("Failed to load workspace members or invitations", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [workspaceId]);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId) return;

        setInviteLoading(true);
        setInviteError("");

        try {
            await apiClient.post(`/workspaces/${workspaceId}/invitations`, {
                email: inviteEmail,
                role: inviteRole,
                permissions: inviteRole === "barista" ? invitePermissions : [],
            });
            setIsInviteOpen(false);
            setInviteEmail("");
            setInvitePermissions([]);
            fetchData();
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

    const handleUpdateMember = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId || !editingMember) return;

        setEditLoading(true);

        try {
            await apiClient.patch(`/workspaces/${workspaceId}/members/${editingMember._id}`, {
                role: editRole,
                permissions: editRole === "barista" ? editPermissions : [],
            });
            setIsEditOpen(false);
            setEditingMember(null);
            fetchData();
        } catch (error) {
            console.error("Failed to update member", error);
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

    const togglePermission = (
        perm: string,
        isChecked: boolean,
        stateSetter: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
        stateSetter((prev) => {
            if (isChecked) {
                return [...prev, perm];
            } else {
                return prev.filter((p) => p !== perm);
            }
        });
    };

    const openEditModal = (member: WorkspaceMember) => {
        setEditingMember(member);
        const normalizedRole = member.role.toLowerCase();
        setEditRole(
            normalizedRole === "owner" ? "barista" : (normalizedRole as "admin" | "manager" | "barista"),
        );
        setEditPermissions(member.permissions || []);
        setIsEditOpen(true);
    };

    if (!workspaceId) return null;

    return (
        <div className="border-border bg-card space-y-8 rounded-xl border p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Shield className="text-primary" size={20} />
                        Керування командою
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Запрошуйте співробітників, налаштовуйте ролі та права доступу до ресурсів
                        кав&apos;ярні.
                    </p>
                </div>
                <Button
                    onClick={() => setIsInviteOpen(true)}
                    variant={buttonVariantKeys.primary}
                    text="Запросити учасника"
                    iconName="plus"
                    className="h-10 text-sm"
                />
            </div>

            <ResourceTable<WorkspaceMember>
                title="Учасники робочого простору"
                data={members}
                isLoading={loading}
                columns={workspaceMemberColumns}
                createActionsColumn={() =>
                    createWorkspaceMemberActionsColumn(handleRemoveMember, openEditModal)
                }
            />

            {invitations.length > 0 && (
                <div className="border-border border-t pt-4">
                    <h3 className="text-muted-foreground mb-3 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
                        <Mail size={16} />
                        Очікують прийняття
                    </h3>
                    <div className="border-border overflow-x-auto rounded-xl border border-dashed">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/30">
                                <tr className="border-border text-muted-foreground border-b text-xs font-medium uppercase">
                                    <th className="px-4 py-2.5">Email</th>
                                    <th className="px-4 py-2.5">Роль</th>
                                    <th className="px-4 py-2.5">Статус</th>
                                    <th className="px-4 py-2.5 text-right">Скасувати</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invitations.map((inv) => (
                                    <tr
                                        key={inv._id}
                                        className="border-border hover:bg-muted/20 border-b last:border-none"
                                    >
                                        <td className="text-foreground px-4 py-2.5 font-medium">
                                            {inv.email}
                                        </td>
                                        <td className="px-4 py-2.5">{getRoleBadge(inv.role)}</td>
                                        <td className="px-4 py-2.5">
                                            <Badge color="bg-yellow-500/10" textColor="text-yellow-500">
                                                Надіслано
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-2.5 text-right">
                                            <button
                                                onClick={() => handleCancelInvitation(inv._id)}
                                                className="rounded-lg p-1.5 text-rose-500 transition-colors hover:bg-rose-500/10"
                                            >
                                                <X size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <ModalWindow
                open={isInviteOpen}
                onOpenChange={setIsInviteOpen}
                title="Запросити члена команди"
                description="Надішліть запрошення на email для підключення до робочого простору кав'ярні."
                size="md"
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
                            Роль у команді
                        </label>
                        <Select
                            value={inviteRole}
                            onValueChange={(val) => setInviteRole(val as "admin" | "manager" | "barista")}
                            options={[
                                { value: "admin", label: "Адміністратор (повний доступ)" },
                                { value: "manager", label: "Менеджер (все, крім видалення)" },
                                { value: "barista", label: "Бариста (обмежені доступи)" },
                            ]}
                        />
                    </div>

                    {inviteRole === "barista" && (
                        <div className="bg-muted/30 border-border space-y-3 rounded-xl border p-4">
                            <label className="text-muted-foreground mb-1 block text-xs font-semibold uppercase">
                                Доступи для Бариста
                            </label>
                            <div className="grid max-h-52 grid-cols-1 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
                                {RESOURCES.map((res) => (
                                    <div
                                        key={res.key}
                                        className="bg-card border-border space-y-1 rounded-lg border p-2"
                                    >
                                        <div className="text-foreground text-xs font-semibold">
                                            {res.label}
                                        </div>
                                        <div className="mt-1 flex items-center gap-4">
                                            <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs select-none">
                                                <input
                                                    type="checkbox"
                                                    className="border-border text-primary h-3.5 w-3.5 rounded focus:ring-0"
                                                    checked={invitePermissions.includes(`${res.key}:read`)}
                                                    onChange={(e) =>
                                                        togglePermission(
                                                            `${res.key}:read`,
                                                            e.target.checked,
                                                            setInvitePermissions,
                                                        )
                                                    }
                                                />
                                                Читати
                                            </label>
                                            <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs select-none">
                                                <input
                                                    type="checkbox"
                                                    className="border-border text-primary h-3.5 w-3.5 rounded focus:ring-0"
                                                    checked={invitePermissions.includes(`${res.key}:write`)}
                                                    onChange={(e) =>
                                                        togglePermission(
                                                            `${res.key}:write`,
                                                            e.target.checked,
                                                            setInvitePermissions,
                                                        )
                                                    }
                                                />
                                                Запис
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
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
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                title="Налаштування доступу"
                description={`Редагування ролі та доступів для ${editingMember?.userId.email}`}
                size="md"
            >
                <form onSubmit={handleUpdateMember} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-muted-foreground text-xs font-semibold uppercase">
                            Роль у команді
                        </label>
                        <Select
                            value={editRole}
                            onValueChange={(val) => setEditRole(val as "admin" | "manager" | "barista")}
                            options={[
                                { value: "admin", label: "Адміністратор (повний доступ)" },
                                { value: "manager", label: "Менеджер (все, крім видалення)" },
                                { value: "barista", label: "Бариста (обмежені доступи)" },
                            ]}
                        />
                    </div>

                    {editRole === "barista" && (
                        <div className="bg-muted/30 border-border space-y-3 rounded-xl border p-4">
                            <label className="text-muted-foreground mb-1 block text-xs font-semibold uppercase">
                                Доступи для Бариста
                            </label>
                            <div className="grid max-h-52 grid-cols-1 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
                                {RESOURCES.map((res) => (
                                    <div
                                        key={res.key}
                                        className="bg-card border-border space-y-1 rounded-lg border p-2"
                                    >
                                        <div className="text-foreground text-xs font-semibold">
                                            {res.label}
                                        </div>
                                        <div className="mt-1 flex items-center gap-4">
                                            <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs select-none">
                                                <input
                                                    type="checkbox"
                                                    className="border-border text-primary h-3.5 w-3.5 rounded focus:ring-0"
                                                    checked={editPermissions.includes(`${res.key}:read`)}
                                                    onChange={(e) =>
                                                        togglePermission(
                                                            `${res.key}:read`,
                                                            e.target.checked,
                                                            setEditPermissions,
                                                        )
                                                    }
                                                />
                                                Читати
                                            </label>
                                            <label className="text-muted-foreground flex cursor-pointer items-center gap-1.5 text-xs select-none">
                                                <input
                                                    type="checkbox"
                                                    className="border-border text-primary h-3.5 w-3.5 rounded focus:ring-0"
                                                    checked={editPermissions.includes(`${res.key}:write`)}
                                                    onChange={(e) =>
                                                        togglePermission(
                                                            `${res.key}:write`,
                                                            e.target.checked,
                                                            setEditPermissions,
                                                        )
                                                    }
                                                />
                                                Запис
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
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
        </div>
    );
}
