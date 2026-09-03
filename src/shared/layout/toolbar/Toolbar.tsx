"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { InvertedCorner } from "@/shared/layout/toolbar/inverted-corner/InvertedCorner";
import { ToolbarAvatarMenu } from "@/shared/layout/toolbar/toolbar-avatar-menu/ToolbarAvatarMenu";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Text } from "@/shared/ui/typography/text/Text";

interface ToolbarProps {
    className?: string;
    userName?: string;
}

function isCoffeeShopPath(pathname: string) {
    return pathname.startsWith("/coffee-shop/");
}

function getCoffeeShopIdFromPathname(pathname: string) {
    if (!isCoffeeShopPath(pathname)) return null;

    return pathname.split("/")[2] || null;
}

export function Toolbar({ className, userName }: ToolbarProps) {
    const pathname = usePathname();
    const coffeeShopId = getCoffeeShopIdFromPathname(pathname);
    const selectedCoffeeShopName = useAppSelector((state) => {
        if (!coffeeShopId) return null;

        return state.coffeeShop.coffeeShops.find((shop) => shop._id === coffeeShopId)?.name ?? null;
    });

    return (
        <header
            className={cn(
                "bg-sidebar relative flex h-14 flex-none items-center justify-between pr-4",
                className,
            )}
        >
            <InvertedCorner className="absolute top-full left-0" fillColor="fill-sidebar" />
            {selectedCoffeeShopName ? <Text> {selectedCoffeeShopName}</Text> : null}
            <ToolbarAvatarMenu userName={userName} />
        </header>
    );
}
