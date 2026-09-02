import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { DailyReports } from "@/modules/daily-report/components/page/DailyReports";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface DailyReportsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: DailyReportsPageProps) {
    const dailyReportsProps = await params;

    return createMetadata({
        title: "Щоденні звіти",
        resourceName: "Кав'ярня",
        description: `Журнал фінансових та касових звітів кав'ярні за зміну.
        Фіксуйте виторг, суми готівки, термінал, транзакції та залишки.`,
        canonicalPath: routeKeys.dailyReports(dailyReportsProps.coffeeShopId),
    });
}

export default async function DailyReportsPage({ params }: DailyReportsPageProps) {
    const dailyReportsProps = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        {
            name: "Кав'ярня",
            path: routeKeys.coffeeShopHome(dailyReportsProps.coffeeShopId),
        },
        {
            name: "Щоденні звіти",
            path: routeKeys.dailyReports(dailyReportsProps.coffeeShopId),
        },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(dailyReportsProps.coffeeShopId) },
                    { label: "Щоденні звіти" },
                ]}
            />
            <DailyReports coffeeShopId={dailyReportsProps.coffeeShopId} />
        </>
    );
}
