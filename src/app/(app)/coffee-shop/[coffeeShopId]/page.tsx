import { routeKeys } from "@/shared/constants/route-keys";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";
import { Text } from "@/shared/ui/typography/text/Text";

export default async function CoffeeShopPage({ params }: { params: Promise<{ coffeeShopId: string }> }) {
    const { coffeeShopId } = await params;

    return (
        <div>
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(coffeeShopId) },
                ]}
            />

            <Text>
                Тут скоро буде детальна інформація про кавʼярню, налаштування, статистика та ресурсний
                контекст.
            </Text>
        </div>
    );
}
