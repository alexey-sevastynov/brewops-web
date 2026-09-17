"use client";

import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { CoffeeShopEmptyState } from "@/modules/coffee-shop/components/CoffeeShopEmptyState";
import { CoffeeShopGrid } from "@/modules/coffee-shop/components/CoffeeShopGrid";
import { WorkspaceEmptyState } from "@/modules/workspace/components/WorkspaceEmptyState";
import { selectCurrentWorkspace } from "@/modules/workspace/model/workspace-selectors";

export function AppHomePage() {
    const currentWorkspace = useAppSelector(selectCurrentWorkspace);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const isLoading = useAppSelector((state) => state.workspace.isLoading || state.coffeeShop.isLoading);

    if (isLoading && coffeeShops.length === 0) {
        return null;
    }

    if (!currentWorkspace) {
        return <WorkspaceEmptyState />;
    }

    if (coffeeShops.length === 0) {
        return <CoffeeShopEmptyState />;
    }

    return <CoffeeShopGrid coffeeShops={coffeeShops} />;
}
