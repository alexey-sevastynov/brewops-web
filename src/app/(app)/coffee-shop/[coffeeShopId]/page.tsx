import { routeKeys } from "@/shared/constants/route-keys";
import { routeLabels } from "@/shared/constants/route-labels";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";
import { Text } from "@/shared/ui/typography/text/Text";

export default async function CoffeeShopPage({ params }: { params: Promise<{ coffeeShopId: string }> }) {
    const { coffeeShopId } = await params;

    const coffeeShopBreadcrumbs = [
        { label: routeLabels.home, href: routeKeys.home },
        { label: routeLabels.coffeeShopHome, href: routeKeys.coffeeShopHome(coffeeShopId) },
    ];

    return (
        <>
            <Breadcrumbs items={coffeeShopBreadcrumbs} />
            <Text>
                Тут скоро буде детальна інформація про кавʼярню, налаштування, статистика та ресурсний
                контекст.
            </Text>
        </>
    );
}
