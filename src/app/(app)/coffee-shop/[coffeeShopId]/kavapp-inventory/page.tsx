import { KavappInventory } from "@/modules/kavapp-inventory/components/page/KavappInventory";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface KavappInventoryPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: KavappInventoryPageProps) {
    const kavappInventoryParams = await params;

    return createMetadata({
        title: "Наявність товару на торговій точці",
        resourceName: "Кав'ярня",
        description: `Наявність товару на торговій точці із системи Kavapp. 
    Посуд, інгредієнти, товари та заготівлі.`,
        canonicalPath: routeKeys.kavappInventory(kavappInventoryParams.coffeeShopId),
    });
}

export default async function KavappInventoryPage({ params }: KavappInventoryPageProps) {
    const kavappInventoryParams = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Кав'ярня", path: routeKeys.coffeeShop },
        {
            name: "Kavapp інвентаризація",
            path: routeKeys.kavappInventory(kavappInventoryParams.coffeeShopId),
        },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(kavappInventoryParams.coffeeShopId) },
                    { label: "Kavapp інвентаризація" },
                ]}
            />
            <KavappInventory coffeeShopId={kavappInventoryParams.coffeeShopId} />
        </>
    );
}
