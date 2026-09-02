"use client";

import { CoffeeShopEmptyState } from "@/modules/coffee-shop/components/CoffeeShopEmptyState";
import { CoffeeShopGrid } from "@/modules/coffee-shop/components/CoffeeShopGrid";
import { WorkspaceEmptyState } from "@/modules/workspace/components/WorkspaceEmptyState";
import { WorkspaceLoading } from "@/modules/workspace/components/WorkspaceLoading";
import { useInitializeWorkspace } from "@/modules/workspace/hooks/use-app-home";

export default function AppHomePage() {
    const workspaceInitialization = useInitializeWorkspace();

    if (workspaceInitialization.isLoading && workspaceInitialization.coffeeShops.length === 0) {
        return <WorkspaceLoading />;
    }

    if (!workspaceInitialization.selectedWorkspaceId) {
        return <WorkspaceEmptyState />;
    }

    if (workspaceInitialization.coffeeShops.length === 0) {
        return <CoffeeShopEmptyState />;
    }

    return <CoffeeShopGrid coffeeShops={workspaceInitialization.coffeeShops} />;
}
