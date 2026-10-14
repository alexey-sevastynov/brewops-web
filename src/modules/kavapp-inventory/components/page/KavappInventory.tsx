"use client";

import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { selectWorkspaceByCoffeeShopId } from "@/modules/workspace/model/workspace-selectors";
import { isFreePlan } from "@/modules/workspace/utils/guards";
import { KavappPlanRestrictedNotice } from "@/modules/kavapp-inventory/components/KavappPlanRestrictedNotice";
import { KavappInventoryTable } from "@/modules/kavapp-inventory/components/kavapp-inventory-table/KavappInventoryTable";

export function KavappInventory({ coffeeShopId }: WithCoffeeShopId) {
    const workspace = useAppSelector((state) => selectWorkspaceByCoffeeShopId(state, coffeeShopId));

    if (workspace?.planKey && isFreePlan(workspace.planKey)) {
        return <KavappPlanRestrictedNotice />;
    }

    return <KavappInventoryTable coffeeShopId={coffeeShopId} />;
}
