import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { DailyReports } from "@/modules/daily-report/components/page/DailyReports";

interface DailyReportsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const dailyReportsProps = await params;

    return createMetadata({
        title: routeLabels.dailyReports,
        resourceName: resourceNames.dailyReports,
        description: `Журнал фінансових та касових звітів кав'ярні за зміну.
        Фіксуйте виторг, суми готівки, термінал, транзакції та залишки.`,
        canonicalPath: routeKeys.dailyReports(dailyReportsProps.coffeeShopId),
    });
}

export default async function DailyReportsPage({ params }: DailyReportsPageProps) {
    const dailyReportsProps = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={dailyReportsProps.coffeeShopId}
                currentLabel={routeLabels.dailyReports}
            />
            <DailyReports coffeeShopId={dailyReportsProps.coffeeShopId} />
        </>
    );
}
