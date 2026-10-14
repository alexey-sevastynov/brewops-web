import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { ExpenseReport } from "@/modules/expense-report/components/page/ExpenseReport";

interface ExpenseReportsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: ExpenseReportsPageProps) {
    const expenseReportsPageParams = await params;

    return createMetadata({
        title: routeLabels.expenseReports,
        resourceName: resourceNames.expenseReports,
        description: `Контролюйте та оптимізуйте витрати вашої кав’ярні: операційні витрати, оренду та комунальні послуги.`,
        canonicalPath: routeKeys.expenseReports(expenseReportsPageParams.coffeeShopId),
    });
}

export default async function ExpenseReportsPage({ params }: ExpenseReportsPageProps) {
    const expenseReportsPageParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={expenseReportsPageParams.coffeeShopId}
                currentLabel={routeLabels.expenseReports}
            />
            <ExpenseReport coffeeShopId={expenseReportsPageParams.coffeeShopId} />
        </>
    );
}
