import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { InventoryAudit } from "@/modules/inventory-audit/components/page/InventoryAudit";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";

interface InventoryAuditsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const inventoryAuditParams = await params;

    return createMetadata({
        title: routeLabels.inventoryAudits,
        resourceName: resourceNames.inventoryAudits,
        description: `Проводьте регулярний аудит інгредієнтів та товарів: зернової кави, молока, сиропів, 
    стаканчиків та витратних матеріалів.`,
        canonicalPath: routeKeys.inventoryAudits(inventoryAuditParams.coffeeShopId),
    });
}

export default async function InventoryAuditsPage({ params }: InventoryAuditsPageProps) {
    const inventoryAuditParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={inventoryAuditParams.coffeeShopId}
                currentLabel={routeLabels.inventoryAudits}
            />
            <InventoryAudit coffeeShopId={inventoryAuditParams.coffeeShopId} />
        </>
    );
}
