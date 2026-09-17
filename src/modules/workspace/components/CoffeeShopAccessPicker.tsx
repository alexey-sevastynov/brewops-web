/* eslint-disable max-lines-per-function */
"use client";

import { Shield, Store } from "lucide-react";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { resourceNames, ResourceName } from "@/shared/constants/resource-names";
import { resourceLabels } from "@/shared/constants/resource-labels";
import { permissionActions, permissionActionLabels } from "@/shared/enums/permission-action";
import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";

export interface ShopAccessItemState {
    coffeeShopId: string;
    role?: string;
    permissions: string[];
}

interface CoffeeShopAccessPickerProps {
    coffeeShops: CoffeeShop[];
    workspaceRole: WorkspaceRoleKey;
    value: ShopAccessItemState[];
    onChange: (newValue: ShopAccessItemState[]) => void;
}

export function CoffeeShopAccessPicker({
    coffeeShops,
    workspaceRole,
    value,
    onChange,
}: CoffeeShopAccessPickerProps) {
    if (workspaceRole === workspaceRoleKeys.admin) {
        return (
            <div className="flex items-start gap-3 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3.5 text-sm text-indigo-400">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                <div>
                    <div className="text-foreground font-semibold">Повний доступ адміністратора</div>
                    <div className="text-muted-foreground mt-0.5 text-xs">
                        Адміністратор автоматично має повний доступ до всіх кав&apos;ярень і налаштувань
                        робочого простору.
                    </div>
                </div>
            </div>
        );
    }

    if (!coffeeShops.length) {
        return (
            <div className="border-border text-muted-foreground rounded-xl border border-dashed p-4 text-center text-sm">
                У цьому робочому просторі ще немає створених кав&apos;ярень.
            </div>
        );
    }

    const toggleShopAccess = (shopId: string, enabled: boolean) => {
        if (enabled) {
            const defaultPerms = [
                `${resourceNames.dailyReports}:${permissionActions.read}`,
                `${resourceNames.dailyReports}:${permissionActions.write}`,
                `${resourceNames.expenseReports}:${permissionActions.read}`,
                `${resourceNames.expenseReports}:${permissionActions.write}`,
            ];
            const newItem: ShopAccessItemState = {
                coffeeShopId: shopId,
                role: "custom",
                permissions: defaultPerms,
            };
            onChange([...value, newItem]);
        } else {
            onChange(value.filter((item) => item.coffeeShopId !== shopId));
        }
    };

    const toggleShopPermission = (shopId: string, perm: string, checked: boolean) => {
        onChange(
            value.map((item) => {
                if (item.coffeeShopId !== shopId) return item;

                const newPerms = checked
                    ? [...item.permissions, perm]
                    : item.permissions.filter((p) => p !== perm);

                return { ...item, permissions: newPerms };
            }),
        );
    };

    const selectAllPermissionsForShop = (shopId: string) => {
        const allPerms = Object.values(resourceNames).flatMap((key) => [
            `${key}:${permissionActions.read}`,
            `${key}:${permissionActions.write}`,
            `${key}:${permissionActions.delete}`,
        ]);
        onChange(
            value.map((item) => {
                if (item.coffeeShopId !== shopId) return item;

                return { ...item, permissions: allPerms };
            }),
        );
    };

    const selectReadOnlyPermissionsForShop = (shopId: string) => {
        const readPerms = (Object.values(resourceNames) as ResourceName[]).map(
            (key) => `${key}:${permissionActions.read}`,
        );
        onChange(
            value.map((item) => {
                if (item.coffeeShopId !== shopId) return item;

                return { ...item, permissions: readPerms };
            }),
        );
    };

    const clearPermissionsForShop = (shopId: string) => {
        onChange(
            value.map((item) => {
                if (item.coffeeShopId !== shopId) return item;

                return { ...item, permissions: [] };
            }),
        );
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                    Доступ до кав&apos;ярень ({value.length} з {coffeeShops.length})
                </label>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                {coffeeShops.map((shop) => {
                    const shopAccess = value.find((item) => item.coffeeShopId === shop._id);
                    const isEnabled = Boolean(shopAccess);

                    return (
                        <div
                            key={shop._id}
                            className={`rounded-xl border transition-all ${
                                isEnabled
                                    ? "border-primary/40 bg-card shadow-sm"
                                    : "border-border/60 bg-muted/20 opacity-75 hover:opacity-100"
                            } p-3.5`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <label className="flex cursor-pointer items-center gap-2.5 select-none">
                                    <input
                                        type="checkbox"
                                        checked={isEnabled}
                                        onChange={(e) => toggleShopAccess(shop._id, e.target.checked)}
                                        className="border-border text-primary h-4 w-4 rounded focus:ring-0"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Store
                                            className={`h-4 w-4 ${isEnabled ? "text-primary" : "text-muted-foreground"}`}
                                        />
                                        <span className="text-foreground text-sm font-semibold">
                                            {shop.name}
                                        </span>
                                        {shop.address && (
                                            <span className="text-muted-foreground hidden max-w-[200px] truncate text-xs sm:inline">
                                                • {shop.address}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            </div>

                            {isEnabled && shopAccess && (
                                <div className="border-border/60 mt-3.5 space-y-2.5 border-t pt-3">
                                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                                        <span className="font-medium">Дії для модулів:</span>
                                        <div className="flex gap-2 text-xs">
                                            <button
                                                type="button"
                                                onClick={() => selectAllPermissionsForShop(shop._id)}
                                                className="text-primary hover:underline"
                                            >
                                                Повний
                                            </button>
                                            <span>•</span>
                                            <button
                                                type="button"
                                                onClick={() => selectReadOnlyPermissionsForShop(shop._id)}
                                                className="text-primary hover:underline"
                                            >
                                                Тільки перегляд
                                            </button>
                                            <span>•</span>
                                            <button
                                                type="button"
                                                onClick={() => clearPermissionsForShop(shop._id)}
                                                className="text-muted-foreground hover:underline"
                                            >
                                                Очистити
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {(Object.values(resourceNames) as ResourceName[]).map((resKey) => {
                                            const readPerm = `${resKey}:${permissionActions.read}`;
                                            const writePerm = `${resKey}:${permissionActions.write}`;
                                            const deletePerm = `${resKey}:${permissionActions.delete}`;

                                            const hasRead = shopAccess.permissions.includes(readPerm);
                                            const hasWrite = shopAccess.permissions.includes(writePerm);
                                            const hasDelete = shopAccess.permissions.includes(deletePerm);

                                            return (
                                                <div
                                                    key={resKey}
                                                    className="bg-muted/30 border-border/50 flex items-center justify-between gap-2 rounded-lg border p-2"
                                                >
                                                    <span className="text-foreground truncate text-xs font-medium">
                                                        {resourceLabels[resKey]}
                                                    </span>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <label className="text-muted-foreground flex cursor-pointer items-center gap-1 text-[11px] select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={hasRead}
                                                                onChange={(e) =>
                                                                    toggleShopPermission(
                                                                        shop._id,
                                                                        readPerm,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                                className="border-border text-primary h-3 w-3 rounded focus:ring-0"
                                                            />
                                                            {permissionActionLabels[permissionActions.read]}
                                                        </label>
                                                        <label className="text-muted-foreground flex cursor-pointer items-center gap-1 text-[11px] select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={hasWrite}
                                                                onChange={(e) =>
                                                                    toggleShopPermission(
                                                                        shop._id,
                                                                        writePerm,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                                className="border-border text-primary h-3 w-3 rounded focus:ring-0"
                                                            />
                                                            {permissionActionLabels[permissionActions.write]}
                                                        </label>
                                                        <label className="text-muted-foreground flex cursor-pointer items-center gap-1 text-[11px] select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={hasDelete}
                                                                onChange={(e) =>
                                                                    toggleShopPermission(
                                                                        shop._id,
                                                                        deletePerm,
                                                                        e.target.checked,
                                                                    )
                                                                }
                                                                className="border-border h-3 w-3 rounded text-rose-500 focus:ring-0"
                                                            />
                                                            {permissionActionLabels[permissionActions.delete]}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
