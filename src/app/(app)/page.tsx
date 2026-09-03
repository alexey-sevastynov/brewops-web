"use client";

import { CoffeeShopEmptyState } from "@/modules/coffee-shop/components/CoffeeShopEmptyState";
import { CoffeeShopGrid } from "@/modules/coffee-shop/components/CoffeeShopGrid";
import { WorkspaceEmptyState } from "@/modules/workspace/components/WorkspaceEmptyState";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";

export default function AppHomePage() {
    const selectedWorkspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const isLoading = useAppSelector((state) => state.workspace.isLoading || state.coffeeShop.isLoading);

    if (isLoading && coffeeShops.length === 0) {
        return null;
    }

    if (!selectedWorkspaceId) {
        return <WorkspaceEmptyState />;
    }

    if (coffeeShops.length === 0) {
        return <CoffeeShopEmptyState />;
    }

    return <CoffeeShopGrid coffeeShops={coffeeShops} />;
}
