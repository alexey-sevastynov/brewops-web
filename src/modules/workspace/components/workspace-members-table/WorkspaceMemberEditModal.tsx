"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { Button } from "@/shared/ui/button/Button";
import { Icon } from "@/shared/ui/icon/Icon";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { isNonEmptyArray } from "@/shared/utils/array";
import { Select } from "@/shared/ui/select/Select";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { ShopAccessItemState } from "@/modules/workspace/types/shop-access-item-state";
import { CoffeeShopAccessPicker } from "@/modules/workspace/components/CoffeeShopAccessPicker";
import { WorkspaceMember } from "@/modules/workspace/types/workspace-member";
import { getWorkspaceMembers, updateWorkspaceMember } from "@/modules/workspace/model/workspace-thunks";
import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { isAdminRole } from "@/modules/workspace/utils/guards";

interface WorkspaceMemberEditModalProps {
    open: boolean;
    onOpenChange: VoidFunc<boolean>;
    member: WorkspaceMember | null;
    workspaceId: string;
    coffeeShops: CoffeeShop[];
    isOwner: boolean;
}

export function WorkspaceMemberEditModal({
    open,
    onOpenChange,
    member,
    workspaceId,
    coffeeShops,
    isOwner,
}: WorkspaceMemberEditModalProps) {
    const workspaceMemberEditForm = useWorkspaceMemberEditForm(
        member,
        workspaceId,
        coffeeShops,
        onOpenChange,
    );

    return (
        <ModalWindow
            open={open}
            onOpenChange={onOpenChange}
            title="Налаштування доступу"
            description={`Редагування ролі та доступів для ${member?.userId.email || "учасника"}`}
            size="lg"
        >
            <form onSubmit={workspaceMemberEditForm.handleSubmit} className="space-y-6">
                {workspaceMemberEditForm.error && (
                    <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
                        <Icon name={iconNames.shieldAlert} />
                        {workspaceMemberEditForm.error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-semibold uppercase">
                        Роль у команді
                    </label>
                    <Select
                        value={workspaceMemberEditForm.role}
                        onValueChange={(workspaceRoleKey) =>
                            workspaceMemberEditForm.setRole(workspaceRoleKey as WorkspaceRoleKey)
                        }
                        options={getRoleOptions(isOwner)}
                    />
                </div>

                <CoffeeShopAccessPicker
                    coffeeShops={coffeeShops}
                    workspaceRole={workspaceMemberEditForm.role}
                    value={workspaceMemberEditForm.shopAccess}
                    onChange={workspaceMemberEditForm.setShopAccess}
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
                        loading={workspaceMemberEditForm.loading}
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
    member: WorkspaceMember,
    coffeeShops: CoffeeShop[],
    role: WorkspaceRoleKey,
): ShopAccessItemState[] => {
    if (member.coffeeShopAccess && isNonEmptyArray(member.coffeeShopAccess)) {
        return member.coffeeShopAccess;
    }

    if (isNonEmptyArray(coffeeShops) && !isAdminRole(role)) {
        return coffeeShops.map((shop) => ({
            coffeeShopId: shop._id,
            role: workspaceRoleKeys.custom,
            permissions: member.permissions || [],
        }));
    }

    return [];
};

function useWorkspaceMemberEditForm(
    member: WorkspaceMember | null,
    workspaceId: string,
    coffeeShops: CoffeeShop[],
    onOpenChange: VoidFunc<boolean>,
) {
    const dispatch = useAppDispatch();
    const [role, setRole] = useState<WorkspaceRoleKey>(workspaceRoleKeys.custom);
    const [shopAccess, setShopAccess] = useState<ShopAccessItemState[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!member) return;

        const normalizedRole = member.role.toLowerCase();
        const initialRole =
            normalizedRole === workspaceRoleKeys.admin ? workspaceRoleKeys.admin : workspaceRoleKeys.custom;

        setRole(initialRole);
        setShopAccess(getInitialShopAccess(member, coffeeShops, initialRole));
        setError("");
    }, [member, coffeeShops]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId || !member) return;

        setLoading(true);
        setError("");

        try {
            await dispatch(
                updateWorkspaceMember({
                    workspaceId,
                    memberId: member._id,
                    role,
                    coffeeShopAccess: role === workspaceRoleKeys.admin ? [] : shopAccess,
                }),
            ).unwrap();

            await dispatch(getWorkspaceMembers(workspaceId));
            onOpenChange(false);
        } catch (err: unknown) {
            const apiMessage = (err as { message?: string })?.message;

            setError(apiMessage || "Не вдалося оновити учасника.");
        } finally {
            setLoading(false);
        }
    };

    return { role, setRole, shopAccess, setShopAccess, loading, error, handleSubmit };
}
