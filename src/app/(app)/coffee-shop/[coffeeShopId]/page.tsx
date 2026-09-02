import { routeKeys } from "@/shared/constants/route-keys";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

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
            <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
                    Coffee shop
                </p>
                <h1 className="text-3xl font-semibold">Кавʼярня #{coffeeShopId}</h1>
            </div>

            <div className="bg-card border-border rounded-2xl border p-6">
                <p className="text-muted-foreground">
                    Тут скоро буде детальна інформація про кавʼярню, налаштування, статистика та ресурсний
                    контекст.
                </p>
            </div>
        </div>
    );
}
