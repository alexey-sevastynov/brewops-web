"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/shared/ui/icon/Icon";
import { Link } from "@/shared/ui/link/Link";
import { cn } from "@/shared/lib/cn";
import { IconColor } from "@/shared/ui/icon/icon-color";
import { iconSizes } from "@/shared/ui/icon/icon-size";
import { iconStrokeWidths } from "@/shared/ui/icon/icon-stroke-width";
import { IconName } from "@/shared/ui/icon/icon-name";
import { appToast } from "@/shared/lib/toast";

export interface SidebarNavigationItem {
    href: string;
    iconName: IconName;
    label: string;
    iconColor?: IconColor;
    disabled?: boolean;
    disabledMessage?: string;
}

interface SidebarNavigationItemProps {
    sidebarNavigationItem: SidebarNavigationItem;
}

export function SidebarNavigationItem({ sidebarNavigationItem }: SidebarNavigationItemProps) {
    const pathname = usePathname();
    const isActive = pathname === sidebarNavigationItem.href;
    const isDisabled = sidebarNavigationItem.disabled;

    const itemContent = (
        <Icon
            className="group-hover:text-primary"
            name={sidebarNavigationItem.iconName}
            color={sidebarNavigationItem.iconColor}
            size={iconSizes.large}
            strokeWidth={iconStrokeWidths.thick}
        />
    );

    return (
        <li className="group relative flex size-14 items-center justify-center">
            {isDisabled ? (
                <div
                    aria-disabled="true"
                    className="text-muted-foreground relative flex cursor-not-allowed items-center justify-center rounded-md p-2 opacity-50"
                    onClick={() => {
                        if (sidebarNavigationItem.disabledMessage) {
                            appToast.info(sidebarNavigationItem.disabledMessage, {
                                id: "employees-required",
                            });
                        }
                    }}
                >
                    {itemContent}
                </div>
            ) : (
                <Link
                    href={sidebarNavigationItem.href}
                    className={cn(
                        "relative flex items-center justify-center rounded-md p-2 transition-colors",
                        isActive && "bg-primary/20",
                        "hover:bg-primary/10",
                    )}
                >
                    {itemContent}
                </Link>
            )}
        </li>
    );
}
