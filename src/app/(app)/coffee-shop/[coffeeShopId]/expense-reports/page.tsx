import { ExpenseReport } from "@/modules/expense-report/components/page/ExpenseReport";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { routeKeys } from "@/shared/constants/route-keys";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface ExpenseReportsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: ExpenseReportsPageProps) {
    const expenseReportsPageParams = await params;

    return createMetadata({
        title: "Звіти про витрати",
        resourceName: "Кав'ярня",
        description: `Контролюйте та оптимізуйте витрати вашої кав’ярні: операційні витрати, оренду та комунальні послуги.`,
        canonicalPath: routeKeys.expenseReports(expenseReportsPageParams.coffeeShopId),
    });
}

export default async function ExpenseReportsPage({ params }: ExpenseReportsPageProps) {
    const expenseReportsPageParams = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Кав'ярня", path: routeKeys.coffeeShop },
        { name: "Звіти про витрати", path: routeKeys.expenseReports(expenseReportsPageParams.coffeeShopId) },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    {
                        label: "Кавʼярня",
                        href: routeKeys.coffeeShopHome(expenseReportsPageParams.coffeeShopId),
                    },
                    { label: "Звіти про витрати" },
                ]}
            />
            <ExpenseReport coffeeShopId={expenseReportsPageParams.coffeeShopId} />
        </>
    );
}
