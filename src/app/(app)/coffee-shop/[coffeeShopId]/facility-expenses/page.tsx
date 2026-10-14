import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { FacilityExpense } from "@/modules/facility-expense/components/page/FacilityExpense";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";

interface FacilityExpensesPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const facilityExpenseParams = await params;

    return createMetadata({
        title: routeLabels.facilityExpenses,
        resourceName: resourceNames.facilityExpenses,
        description: `Контролюйте витрати на оренду та утримання приміщення: 
    орендна плата, прибирання, витратні матеріали, дрібний ремонт та інші витрати.`,
        canonicalPath: routeKeys.facilityExpenses(facilityExpenseParams.coffeeShopId),
    });
}

export default async function FacilityExpensesPage({ params }: FacilityExpensesPageProps) {
    const facilityExpenseParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={facilityExpenseParams.coffeeShopId}
                currentLabel={routeLabels.facilityExpenses}
            />
            <FacilityExpense coffeeShopId={facilityExpenseParams.coffeeShopId} />
        </>
    );
}
