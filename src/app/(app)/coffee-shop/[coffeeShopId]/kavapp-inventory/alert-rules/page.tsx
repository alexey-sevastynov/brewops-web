import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { InventoryAlertRuleResourceTable } from "@/modules/kavapp-inventory-alert-rules/components/InventoryAlertRuleResourceTable";

interface KavappInventoryPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const kavappInventoryParams = await params;

    return createMetadata({
        title: "Правила сповіщень про залишки",
        resourceName: resourceNames.kavapp,
        description: "Налаштування сповіщень про мінімальні залишки інвентарю Kavapp.",
        canonicalPath: routeKeys.kavappInventoryAlertRules(kavappInventoryParams.coffeeShopId),
    });
}

export default async function InventoryAlertRulesPage({ params }: KavappInventoryPageProps) {
    const kavappInventoryParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={kavappInventoryParams.coffeeShopId}
                currentLabel={routeLabels.kavappInventoryAlertRules}
            />
            <InventoryAlertRuleResourceTable coffeeShopId={kavappInventoryParams.coffeeShopId} />
        </>
    );
}
