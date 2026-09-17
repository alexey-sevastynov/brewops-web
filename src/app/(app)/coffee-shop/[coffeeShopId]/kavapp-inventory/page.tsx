import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { KavappInventory } from "@/modules/kavapp-inventory/components/page/KavappInventory";

interface KavappInventoryPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const kavappInventoryParams = await params;

    return createMetadata({
        title: routeLabels.kavappInventory,
        resourceName: resourceNames.kavapp,
        description: `Наявність товару на торговій точці із системи Kavapp. 
    Посуд, інгредієнти, товари та заготівлі.`,
        canonicalPath: routeKeys.kavappInventory(kavappInventoryParams.coffeeShopId),
    });
}

export default async function KavappInventoryPage({ params }: KavappInventoryPageProps) {
    const kavappInventoryParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={kavappInventoryParams.coffeeShopId}
                currentLabel={routeLabels.kavappInventory}
            />
            <KavappInventory coffeeShopId={kavappInventoryParams.coffeeShopId} />
        </>
    );
}
