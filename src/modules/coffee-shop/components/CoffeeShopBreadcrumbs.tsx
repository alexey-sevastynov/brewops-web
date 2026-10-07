import { routeKeys } from "@/shared/constants/route-keys";
import { routeLabels } from "@/shared/constants/route-labels";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface CoffeeShopBreadcrumbsProps {
    coffeeShopId: string;
    currentLabel: string;
}

export function CoffeeShopBreadcrumbs({ coffeeShopId, currentLabel }: CoffeeShopBreadcrumbsProps) {
    const items = [
        {
            label: routeLabels.home,
            href: routeKeys.home,
        },
        {
            label: routeLabels.coffeeShopHome,
            href: routeKeys.coffeeShopHome(coffeeShopId),
        },
        {
            label: currentLabel,
        },
    ];

    return <Breadcrumbs items={items} />;
}
