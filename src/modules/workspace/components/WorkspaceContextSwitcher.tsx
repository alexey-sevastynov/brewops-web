"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Select } from "@/shared/ui/select/Select";
import { getWorkspaces } from "@/modules/workspace/workspace-thunks";
import { setSelectedWorkspaceId } from "@/modules/workspace/workspace-slice";
import { getCoffeeShops } from "@/modules/coffee-shop/coffee-shop-thunks";
import { setSelectedCoffeeShopId } from "@/modules/coffee-shop/coffee-shop-slice";
import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { removeCookie, setCookie } from "@/shared/utils/cookie/cookie-client";
import { routeKeys } from "@/shared/constants/route-keys";

export function WorkspaceContextSwitcher() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const workspaces = useAppSelector((state) => state.workspace.workspaces);
    const selectedWorkspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const selectedCoffeeShopId = useAppSelector((state) => state.coffeeShop.selectedCoffeeShopId);

    useEffect(() => {
        dispatch(getWorkspaces());
    }, [dispatch]);

    useEffect(() => {
        if (workspaces.length === 0 || selectedWorkspaceId) return;

        const workspaceId = workspaces[0]._id;
        dispatch(setSelectedWorkspaceId(workspaceId));
        setCookie(cookieKeys.workspaceId, workspaceId);
    }, [dispatch, selectedWorkspaceId, workspaces]);

    useEffect(() => {
        if (!selectedWorkspaceId) return;

        dispatch(getCoffeeShops(selectedWorkspaceId));
    }, [dispatch, selectedWorkspaceId]);

    useEffect(() => {
        if (selectedCoffeeShopId) setCookie(cookieKeys.coffeeShopId, selectedCoffeeShopId);
        else removeCookie(cookieKeys.coffeeShopId);
    }, [selectedCoffeeShopId]);

    // Automatically sync workspaceId when coffeeShop changes to one in another workspace
    // useEffect(() => {
    //     if (!selectedCoffeeShopId || coffeeShops.length === 0) return;

    //     const currentShop = coffeeShops.find((shop) => shop._id === selectedCoffeeShopId);
    //     if (currentShop && currentShop.workspaceId && currentShop.workspaceId !== selectedWorkspaceId) {
    //         dispatch(setSelectedWorkspaceId(currentShop.workspaceId));
    //         setCookie(cookieKeys.workspaceId, currentShop.workspaceId);
    //     }
    // }, [selectedCoffeeShopId, coffeeShops, selectedWorkspaceId, dispatch]);

    return (
        <div className="flex max-w-sm items-center gap-2">
            <div className="w-48">
                <Select
                    value={selectedCoffeeShopId ?? undefined}
                    options={coffeeShops.map(({ _id, name }) => ({ value: _id, label: name }))}
                    placeholder={selectedWorkspaceId ? "Виберіть кавʼярню" : "Завантаження..."}
                    disabled={!selectedWorkspaceId || coffeeShops.length === 0}
                    onValueChange={(coffeeShopId) => dispatch(setSelectedCoffeeShopId(coffeeShopId))}
                />
            </div>
            <button
                type="button"
                className="text-primary hover:bg-accent h-10 shrink-0 rounded-xl px-3 text-sm font-medium"
                onClick={() => router.push(routeKeys.workspaceSettings)}
            >
                Керувати
            </button>
            <button
                type="button"
                className="text-muted-foreground hover:bg-accent hover:text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                onClick={() => router.push(routeKeys.workspaceSettings)}
                title="Налаштування"
            >
                <Settings size={18} />
            </button>
        </div>
    );
}
