"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { MRInput } from "@/shared/ui/input/Input";
import { Icon } from "@/shared/ui/icon/Icon";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { Select } from "@/shared/ui/select/Select";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { CoffeeShopAccessPicker } from "@/modules/workspace/components/CoffeeShopAccessPicker";
import {
    createWorkspaceInvitation,
    getWorkspaceInvitations,
    getWorkspaceMembers,
} from "@/modules/workspace/model/workspace-thunks";
import { ShopAccessItemState } from "@/modules/workspace/types/shop-access-item-state";
import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { defaultPermissions } from "@/modules/workspace/constants/default-permissions";

interface WorkspaceInviteModalProps {
    open: boolean;
    onOpenChange: VoidFunc<boolean>;
    workspaceId: string;
    coffeeShops: CoffeeShop[];
    isOwner: boolean;
}

export function WorkspaceInviteModal({
    open,
    onOpenChange,
    workspaceId,
    coffeeShops,
    isOwner,
}: WorkspaceInviteModalProps) {
    const workspaceInviteForm = useWorkspaceInviteForm(open, workspaceId, coffeeShops, onOpenChange);

    return (
        <ModalWindow
            open={open}
            onOpenChange={onOpenChange}
            title="Запросити члена команди"
            description="Надішліть запрошення на email для підключення до робочого простору кав'ярні."
            size="lg"
        >
            <form onSubmit={workspaceInviteForm.handleSubmit} className="space-y-6">
                {workspaceInviteForm.error && (
                    <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-500">
                        <Icon name={iconNames.shieldAlert} />
                        {workspaceInviteForm.error}
                    </div>
                )}

                <MRInput
                    label="Email користувача"
                    type="email"
                    required
                    value={workspaceInviteForm.email}
                    onChange={(e) => workspaceInviteForm.setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                />

                <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-semibold uppercase">
                        Роль у просторі
                    </label>
                    <Select
                        value={workspaceInviteForm.role}
                        onValueChange={(val) => workspaceInviteForm.setRole(val as WorkspaceRoleKey)}
                        options={getRoleOptions(isOwner)}
                    />
                </div>

                <CoffeeShopAccessPicker
                    coffeeShops={coffeeShops}
                    workspaceRole={workspaceInviteForm.role}
                    value={workspaceInviteForm.shopAccess}
                    onChange={workspaceInviteForm.setShopAccess}
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
                        loading={workspaceInviteForm.loading}
                        text="Запросити"
                        className="h-10 text-sm"
                    />
                </div>
            </form>
        </ModalWindow>
    );
}

const getDefaultShopAccess = (coffeeShops: CoffeeShop[]): ShopAccessItemState[] => {
    if (coffeeShops.length === 0) return [];

    return [
        {
            coffeeShopId: coffeeShops[0]._id,
            role: workspaceRoleKeys.custom,
            permissions: defaultPermissions,
        },
    ];
};

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

function useWorkspaceInviteForm(
    open: boolean,
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
        if (!open) return;

        setEmail("");
        setRole(workspaceRoleKeys.custom);
        setError("");
        setShopAccess(getDefaultShopAccess(coffeeShops));
    }, [open, coffeeShops]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!workspaceId) return;

        setLoading(true);
        setError("");

        try {
            await dispatch(
                createWorkspaceInvitation({
                    workspaceId,
                    email,
                    role,
                    coffeeShopAccess: role === workspaceRoleKeys.admin ? [] : shopAccess,
                }),
            ).unwrap();

            await Promise.all([
                dispatch(getWorkspaceMembers(workspaceId)),
                dispatch(getWorkspaceInvitations(workspaceId)),
            ]);

            onOpenChange(false);
        } catch (err: unknown) {
            const apiMessage = (err as { message?: string })?.message;

            setError(apiMessage || "Не вдалося надіслати запрошення.");
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
