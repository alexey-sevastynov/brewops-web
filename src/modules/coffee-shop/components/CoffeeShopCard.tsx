"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { routeKeys } from "@/shared/constants/route-keys";
import { setSelectedCoffeeShopId } from "@/modules/coffee-shop/coffee-shop-slice";
import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";
import { Title } from "@/shared/ui/typography/title/Title";
import { Text } from "@/shared/ui/typography/text/Text";
import { Badge } from "@/shared/ui/badge/Badge";
import { cn } from "@/shared/lib/cn";
import { Icon } from "@/shared/ui/icon/Icon";
import { iconNames } from "@/shared/ui/icon/icon-name";

interface CoffeeShopCardProps {
    coffeeShop: CoffeeShop;
}

export function CoffeeShopCard({ coffeeShop }: CoffeeShopCardProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClick = () => {
        dispatch(setSelectedCoffeeShopId(coffeeShop._id));
        router.push(routeKeys.coffeeShopHome(coffeeShop._id));
    };

    return (
        <button
            className={cn("rounded-xl border p-4 shadow-sm", "cursor-pointer transition hover:shadow-md")}
            tabIndex={0}
            onClick={handleClick}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <Title>Кавʼярня</Title>
                    <Text>{coffeeShop.name}</Text>
                </div>

                <Badge>Open</Badge>
            </div>

            <Text>{coffeeShop.address || "Адреса не вказана"}</Text>

            <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
                <Text>Перейти до панелі</Text>

                <Icon name={iconNames.chevronRight} />
            </div>
        </button>
    );
}
