"use client";

import { Sidebar } from "@/shared/layout/sidebar/Sidebar";
import { Toolbar } from "@/shared/layout/toolbar/Toolbar";
import { routeKeys } from "@/shared/constants/route-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";

interface AppLayoutProps {
    children: React.ReactNode;
    userName: string;
    userRole: string;
    workspaceId?: string;
}

export function AppLayout({ children, userName, userRole, workspaceId: _workspaceId }: AppLayoutProps) {
    return (
        <div className="bg-background flex min-h-screen w-full">
            <Sidebar
                sidebarNavigationItems={navigationItems}
                logoIconName={iconNames.hexagon}
            />
            <div className="flex flex-1 flex-col">
                <Toolbar userName={userName} userRole={userRole} />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}

const navigationItems = [
    {
        href: routeKeys.coffeeShop,
        iconName: iconNames.vault,
        label: "Кавʼярня",
    },
    {
        href: routeKeys.workspaceSettings,
        iconName: iconNames.settings,
        label: "Workspace",
    },
    {
        href: routeKeys.plan,
        iconName: iconNames.crown,
        label: "Тариф",
    },
    {
        href: routeKeys.documentation,
        iconName: iconNames.bookOpen,
        label: "Документація",
    },
];
