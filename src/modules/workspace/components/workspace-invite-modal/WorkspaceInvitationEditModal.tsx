"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { Icon } from "@/shared/ui/icon/Icon";
import { MRInput } from "@/shared/ui/input/Input";
import { Select } from "@/shared/ui/select/Select";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { CoffeeShopAccessPicker } from "@/modules/workspace/components/CoffeeShopAccessPicker";
import { ShopAccessItemState } from "@/modules/workspace/types/shop-access-item-state";
import { WorkspaceInvitation } from "@/modules/workspace/types/workspace-invitation";
import {
    getWorkspaceInvitations,
    updateWorkspaceInvitation,
} from "@/modules/workspace/model/workspace-thunks";
import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { isAdminRole } from "@/modules/workspace/utils/guards";

interface WorkspaceInvitationEditModalProps {
    open: boolean;
    onOpenChange: VoidFunc<boolean>;
    invitation: WorkspaceInvitation | null;
    workspaceId: string;
    coffeeShops: CoffeeShop[];
    isOwner: boolean;
}

export function WorkspaceInvitationEditModal({
    open,
    onOpenChange,
    invitation,
    workspaceId,
    coffeeShops,
    isOwner,
}: WorkspaceInvitationEditModalProps) {
    const workspaceInvitationEditForm = useWorkspaceInvitationEditForm(
        invitation,
        workspaceId,
        coffeeShops,
        onOpenChange,
    );

    return (
        <ModalWindow
            open={open}
            onOpenChange={onOpenChange}
            title="Редагування запрошення"
            description={`Змініть email, роль та доступи для ${invitation?.email ?? "учасника"}.`}
            size="lg"
        >
            <form onSubmit={workspaceInvitationEditForm.handleSubmit} className="space-y-6">
                {workspaceInvitationEditForm.error && (
                    <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
                        <Icon name={iconNames.shieldAlert} />
                        {workspaceInvitationEditForm.error}
                    </div>
                )}

                <MRInput
                    label="Email користувача"
                    type="email"
                    required
                    value={workspaceInvitationEditForm.email}
                    onChange={(e) => workspaceInvitationEditForm.setEmail(e.target.value)}
                />

                <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-semibold uppercase">
                        Роль у команді
                    </label>
                    <Select
                        value={workspaceInvitationEditForm.role}
                        onValueChange={(val) => workspaceInvitationEditForm.setRole(val as WorkspaceRoleKey)}
                        options={getRoleOptions(isOwner)}
                    />
                </div>

                <CoffeeShopAccessPicker
                    coffeeShops={coffeeShops}
                    workspaceRole={workspaceInvitationEditForm.role}
                    value={workspaceInvitationEditForm.shopAccess}
                    onChange={workspaceInvitationEditForm.setShopAccess}
                />

                <div className="border-border/40 mt-6 flex justify-end gap-3 border-t pt-2">
                    <Button
                        type="button"
                        variant={buttonVariantKeys.secondary}
                        onClick={() => onOpenChange(false)}
                        text="Скасувати"
                        className="h-10 text-sm"
                    />
                    <Button
                        type="submit"
                        variant={buttonVariantKeys.primary}
                        loading={workspaceInvitationEditForm.loading}
                        text="Зберегти"
                        className="h-10 text-sm"
                    />
                </div>
            </form>
        </ModalWindow>
    );
}

const getRoleOptions = (isOwner: boolean) => [
    ...(isOwner
        ? [
              {
                  value: workspaceRoleKeys.admin,
                  label: "Адміністратор (повний доступ до всього)",
              },
          ]
        : []),
    {
        value: workspaceRoleKeys.custom,
        label: "Настроюваний доступ (окремі права для кав'ярень)",
    },
];

const getInitialShopAccess = (
    invitation: WorkspaceInvitation,
    coffeeShops: CoffeeShop[],
    role: WorkspaceRoleKey,
): ShopAccessItemState[] => {
    if (invitation.coffeeShopAccess.length > 0) return invitation.coffeeShopAccess;

    if (coffeeShops.length > 0 && !isAdminRole(role)) {
        return [
            {
                coffeeShopId: coffeeShops[0]._id,
                role: workspaceRoleKeys.custom,
                permissions: invitation.permissions,
            },
        ];
    }

    return [];
};

function useWorkspaceInvitationEditForm(
    invitation: WorkspaceInvitation | null,
    workspaceId: string,
    coffeeShops: CoffeeShop[],
    onOpenChange: (open: boolean) => void,
) {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<WorkspaceRoleKey>(workspaceRoleKeys.custom);
    const [shopAccess, setShopAccess] = useState<ShopAccessItemState[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!invitation) return;

        setEmail(invitation.email);
        const normalizedRole = invitation.role?.toLowerCase();
        const initialRole =
            normalizedRole === workspaceRoleKeys.admin ? workspaceRoleKeys.admin : workspaceRoleKeys.custom;

        setRole(initialRole);
        setShopAccess(getInitialShopAccess(invitation, coffeeShops, initialRole));
        setError("");
    }, [invitation, coffeeShops]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId || !invitation) return;

        setLoading(true);
        setError("");

        try {
            await dispatch(
                updateWorkspaceInvitation({
                    workspaceId,
                    invitationId: invitation._id,
                    email,
                    role,
                    coffeeShopAccess: isAdminRole(role) ? [] : shopAccess,
                }),
            ).unwrap();

            await dispatch(getWorkspaceInvitations(workspaceId));
            onOpenChange(false);
        } catch (err: unknown) {
            const apiMessage = (err as { message?: string })?.message;

            setError(apiMessage || "Не вдалося оновити запрошення.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        role,
        setRole,
        shopAccess,
        setShopAccess,
        loading,
        error,
        handleSubmit,
    };
}
