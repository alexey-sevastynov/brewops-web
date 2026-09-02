import { InventoryAlertRuleResourceTable } from "@/modules/kavapp-inventory-alert-rules/components/InventoryAlertRuleResourceTable";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

interface KavappInventoryPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: KavappInventoryPageProps) {
    const kavappInventoryParams = await params;

    return createMetadata({
        title: "Правила сповіщень про залишки",
        resourceName: "Кав'ярня",
        description: "Налаштування сповіщень про мінімальні залишки інвентарю Kavapp.",
        canonicalPath: routeKeys.kavappInventoryAlertRules(kavappInventoryParams.coffeeShopId),
    });
}

export default async function InventoryAlertRulesPage({ params }: KavappInventoryPageProps) {
    const kavappInventoryParams = await params;

    return (
        <>
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    {
                        label: "Кавʼярня",
                        href: routeKeys.coffeeShopHome(kavappInventoryParams.coffeeShopId),
                    },
                    {
                        label: "Kavapp інвентаризація",
                        href: routeKeys.kavappInventory(kavappInventoryParams.coffeeShopId),
                    },
                    { label: "Правила сповіщень" },
                ]}
            />
            <InventoryAlertRuleResourceTable coffeeShopId={kavappInventoryParams.coffeeShopId} />
        </>
    );
}
