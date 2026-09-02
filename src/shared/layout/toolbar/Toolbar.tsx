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
    userRole?: string;
}

function isCoffeeShopPath(pathname: string) {
    return pathname.startsWith("/coffee-shop/");
}

export function Toolbar({ className, userName, userRole }: ToolbarProps) {
    const pathname = usePathname();
    const selectedCoffeeShopName = useAppSelector((state) => {
        if (!isCoffeeShopPath(pathname)) return null;

        return (
            state.coffeeShop.coffeeShops.find((shop) => shop._id === state.coffeeShop.selectedCoffeeShopId)
                ?.name ?? null
        );
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
            <ToolbarAvatarMenu userName={userName} userRole={userRole} />
        </header>
    );
}
