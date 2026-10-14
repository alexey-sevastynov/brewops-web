import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { BirthdayToastNotifier } from "@/modules/employee/components/birthday-toast-notifier/BirthdayToastNotifier";
import { CoffeeShopStatistics } from "@/modules/statistics/components/page/CoffeeShopStatistics";

interface DashboardPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const dashboardParams = await params;

    return createMetadata({
        title: "Статистика кав'ярні",
        resourceName: resourceNames.statistics,
        description: "Статистика та аналітика закладу.",
        canonicalPath: routeKeys.dashboard(dashboardParams.coffeeShopId),
    });
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const dashboardParams = await params;

    return (
        <>
            <BirthdayToastNotifier coffeeShopId={dashboardParams.coffeeShopId} />
            <CoffeeShopBreadcrumbs
                coffeeShopId={dashboardParams.coffeeShopId}
                currentLabel={routeLabels.dashboard}
            />
            <CoffeeShopStatistics coffeeShopId={dashboardParams.coffeeShopId} />
        </>
    );
}
