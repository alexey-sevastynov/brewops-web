import { FacilityExpense } from "@/modules/facility-expense/components/page/FacilityExpense";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { routeKeys } from "@/shared/constants/route-keys";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface FacilityExpensesPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: FacilityExpensesPageProps) {
    const facilityExpenseParams = await params;

    return createMetadata({
        title: "Оренда та утримання приміщення",
        resourceName: "Кав'ярня",
        description: `Контролюйте витрати на оренду та утримання приміщення: 
    орендна плата, прибирання, витратні матеріали, дрібний ремонт та інші витрати.`,
        canonicalPath: routeKeys.facilityExpenses(facilityExpenseParams.coffeeShopId),
    });
}

export default async function FacilityExpensesPage({ params }: FacilityExpensesPageProps) {
    const facilityExpenseParams = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Кав'ярня", path: routeKeys.coffeeShop },
        {
            name: "Оренда та утримання приміщення",
            path: routeKeys.facilityExpenses(facilityExpenseParams.coffeeShopId),
        },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(facilityExpenseParams.coffeeShopId) },
                    { label: "Оренда та утримання приміщення" },
                ]}
            />
            <FacilityExpense coffeeShopId={facilityExpenseParams.coffeeShopId} />
        </>
    );
}
