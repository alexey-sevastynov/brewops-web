import { InventoryAudit } from "@/modules/inventory-audit/components/page/InventoryAudit";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface InventoryAuditsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: InventoryAuditsPageProps) {
    const inventoryAuditParams = await params;

    return createMetadata({
        title: "Інвентаризація та склад",
        resourceName: "Кав'ярня",
        description: `Проводьте регулярний аудит інгредієнтів та товарів: зернової кави, молока, сиропів, 
    стаканчиків та витратних матеріалів.`,
        canonicalPath: routeKeys.inventoryAudits(inventoryAuditParams.coffeeShopId),
    });
}

export default async function InventoryAuditsPage({ params }: InventoryAuditsPageProps) {
    const inventoryAuditParams = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Кав'ярня", path: routeKeys.coffeeShop },
        { name: "Інвентаризація", path: routeKeys.inventoryAudits(inventoryAuditParams.coffeeShopId) },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(inventoryAuditParams.coffeeShopId) },
                    { label: "Інвентаризація" },
                ]}
            />
            <InventoryAudit coffeeShopId={inventoryAuditParams.coffeeShopId} />
        </>
    );
}
