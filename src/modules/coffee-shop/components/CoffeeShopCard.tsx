"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { routeKeys } from "@/shared/constants/route-keys";
import { Title } from "@/shared/ui/typography/title/Title";
import { Text } from "@/shared/ui/typography/text/Text";
import { Badge } from "@/shared/ui/badge/Badge";
import { cn } from "@/shared/lib/cn";
import { textSizes } from "@/shared/ui/typography/text-size";
import { Icon } from "@/shared/ui/icon/Icon";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { Card } from "@/shared/ui/card/Card";
import { navigateTo } from "@/shared/utils/navigation";
import { Divider } from "@/shared/ui/divider/Divider";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { setSelectedCoffeeShopId } from "@/modules/coffee-shop/model/coffee-shop-slice";
import { getWorkspaceRoleBadge } from "@/modules/workspace/configs/workspace-member-columns";

interface CoffeeShopCardProps {
    coffeeShop: CoffeeShop;
}

export function CoffeeShopCard({ coffeeShop }: CoffeeShopCardProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <Card
            className="flex flex-col justify-between"
            onClick={() => {
                dispatch(setSelectedCoffeeShopId(coffeeShop._id));
                navigateTo(router, routeKeys.coffeeShopHome(coffeeShop._id));
            }}
        >
            <div>
                <div className="flex items-start justify-between gap-3">
                    <Title>{coffeeShop.name}</Title>
                    <div className="flex shrink-0 items-center gap-1.5">
                        {getWorkspaceRoleBadge(coffeeShop.myAccess.role)}
                        <Badge
                            color={cn(coffeeShop.isActive ? "bg-green-500/10" : "bg-rose-500/10")}
                            textColor={cn(coffeeShop.isActive ? "text-green-500" : "text-rose-500")}
                        >
                            {coffeeShop.isActive ? "Активна" : "Неактивна"}
                        </Badge>
                    </div>
                </div>

                {coffeeShop?.address && (
                    <div className="flex items-center gap-2">
                        <Icon name={iconNames.mapPin} />
                        <Text textSize={textSizes.sm}>{coffeeShop.address}</Text>
                    </div>
                )}
            </div>

            <div className="flex flex-col">
                <Divider className="py-4" />
                <div className="flex w-full items-center justify-between">
                    <Text>Перейти до панелі</Text>
                    <Icon name={iconNames.chevronRight} />
                </div>
            </div>
        </Card>
    );
}
