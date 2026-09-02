import { CoffeeShopStatistics } from "@/modules/statistics/components/page/CoffeeShopStatistics";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { generateResourceWorkspaceSchema } from "@/shared/utils/seo/shema/generate-resource-workspace";
import { routeKeys } from "@/shared/constants/route-keys";
import { BirthdayToastNotifier } from "@/modules/employee/components/birthday-toast-notifier/BirthdayToastNotifier";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface DashboardPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: DashboardPageProps) {
    const dashboardParams = await params;

    return createMetadata({
        title: "Панель управління",
        resourceName: "Кав'ярня",
        description: `Статистика та аналітика закладу. 
    Відстежуйте виторг, кількість замовлень, середній чек та фінансову динаміку в реальному часі.`,
        canonicalPath: routeKeys.dashboard(dashboardParams.coffeeShopId),
    });
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const dashboardParams = await params;

    const shopSchema = generateResourceWorkspaceSchema(
        "Кав'ярня — Панель аналітики",
        "Аналітичний дашборд для контролю виторгу, транзакцій та прибутковості кав'ярні.",
        routeKeys.dashboard(dashboardParams.coffeeShopId),
        "FoodEstablishment",
    );

    return (
        <>
            <JsonLd schema={shopSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(dashboardParams.coffeeShopId) },
                    { label: "Dashboard" },
                ]}
            />
            <BirthdayToastNotifier coffeeShopId={dashboardParams.coffeeShopId} />
            <CoffeeShopStatistics coffeeShopId={dashboardParams.coffeeShopId} />
        </>
    );
}
