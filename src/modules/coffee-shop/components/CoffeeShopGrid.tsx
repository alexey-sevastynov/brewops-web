import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";
import { CoffeeShopCard } from "@/modules/coffee-shop/components/CoffeeShopCard";
import { textPositions } from "@/shared/ui/typography/text-position";
import { Title } from "@/shared/ui/typography/title/Title";

interface CoffeeShopGridProps {
    coffeeShops: CoffeeShop[];
}

export function CoffeeShopGrid({ coffeeShops }: CoffeeShopGridProps) {
    return (
        <>
            <Title textPosition={textPositions.left}>Ваші кавʼярні</Title>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {coffeeShops.map((coffeeShop) => (
                    <CoffeeShopCard key={coffeeShop._id} coffeeShop={coffeeShop} />
                ))}
            </div>
        </>
    );
}
