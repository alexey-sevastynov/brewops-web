"use client";

import { useParams } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { InvertedCorner } from "@/shared/layout/toolbar/inverted-corner/InvertedCorner";
import { ToolbarAvatarMenu } from "@/shared/layout/toolbar/toolbar-avatar-menu/ToolbarAvatarMenu";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Text } from "@/shared/ui/typography/text/Text";
import { selectCoffeeShopById } from "@/modules/coffee-shop/model/coffee-shop-selectors";

interface ToolbarProps {
    className?: string;
    userName?: string;
}

export function Toolbar({ className, userName }: ToolbarProps) {
    const params = useParams<{ coffeeShopId?: string }>();
    const coffeeShop = useAppSelector((state) => selectCoffeeShopById(state, params.coffeeShopId));

    return (
        <header
            className={cn(
                "bg-sidebar relative flex h-14 flex-none items-center justify-between pr-4",
                className,
            )}
        >
            <InvertedCorner className="absolute top-full left-0" fillColor="fill-sidebar" />
            {coffeeShop?.name ? <Text>{coffeeShop.name}</Text> : null}
            <ToolbarAvatarMenu userName={userName} />
        </header>
    );
}
