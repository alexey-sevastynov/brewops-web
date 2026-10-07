import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/layout/sidebar/logo/Logo";
import { IconName } from "@/shared/ui/icon/icon-name";
import { SidebarNavigation } from "@/shared/layout/sidebar/sidebar-navigation/SidebarNavigation";
import { SidebarNavigationItemConfig } from "@/shared/layout/sidebar/types/sidebar-navigation-item";

interface SidebarProps {
    sidebarNavigationItems: SidebarNavigationItemConfig[];
    logoIconName?: IconName;
    className?: string;
}

export function Sidebar({ sidebarNavigationItems, logoIconName, className }: SidebarProps) {
    return (
        <aside className={cn("bg-sidebar sticky top-0 z-20 flex h-screen w-14 flex-col", className)}>
            <div className="flex size-14 items-center justify-center">
                <Logo logoIconName={logoIconName} />
            </div>

            <SidebarNavigation sidebarNavigationItems={sidebarNavigationItems} />
        </aside>
    );
}
