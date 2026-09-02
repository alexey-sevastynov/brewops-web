"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/shared/layout/sidebar/Sidebar";
import { Toolbar } from "@/shared/layout/toolbar/Toolbar";
import { routeKeys } from "@/shared/constants/route-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { iconColors } from "@/shared/ui/icon/icon-color";

interface AppLayoutProps {
    children: React.ReactNode;
    userName: string;
    userRole: string;
}

export function AppLayout({ children, userName, userRole }: AppLayoutProps) {
    const pathname = usePathname();
    const selectedCoffeeShopId = useAppSelector((state) => state.coffeeShop.selectedCoffeeShopId);
    const sidebarNavigationItems = getSidebarNavigationItems(pathname, selectedCoffeeShopId);

    return (
        <div className="bg-background flex min-h-screen w-full">
            <Sidebar
                sidebarNavigationItems={sidebarNavigationItems}
                logoIconName={isCoffeeShopPath(pathname) ? iconNames.coffee : iconNames.hexagon}
            />
            <div className="flex-1 overflow-auto">
                <Toolbar className="shrink-0" userName={userName} userRole={userRole} />
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}

function isCoffeeShopPath(pathname: string) {
    return pathname.startsWith("/coffee-shop/");
}

function getSidebarNavigationItems(pathname: string, selectedCoffeeShopId: string | null) {
    if (isCoffeeShopPath(pathname) && selectedCoffeeShopId) {
        return [
            {
                href: routeKeys.coffeeShopHome(selectedCoffeeShopId),
                iconName: iconNames.coffee,
                label: "Кавʼярня",
            },
            {
                href: routeKeys.dashboard(selectedCoffeeShopId),
                iconName: iconNames.dashboard,
                label: "Dashboard",
            },
            {
                href: routeKeys.employees(selectedCoffeeShopId),
                iconName: iconNames.users,
                label: "Працівники",
            },
            {
                href: routeKeys.dailyReports(selectedCoffeeShopId),
                iconName: iconNames.clipboardList,
                label: "Daily Reports",
            },
            {
                href: routeKeys.expenseReports(selectedCoffeeShopId),
                iconName: iconNames.wallet,
                label: "Expense Reports",
            },
            {
                href: routeKeys.facilityExpenses(selectedCoffeeShopId),
                iconName: iconNames.building2,
                label: "Facility Expenses",
            },
            {
                href: routeKeys.inventoryAudits(selectedCoffeeShopId),
                iconName: iconNames.clipboardCheck,
                label: "Inventory Audits",
            },
            {
                href: routeKeys.ownerWithdrawals(selectedCoffeeShopId),
                iconName: iconNames.handCoins,
                label: "Owner Withdrawals",
            },
            {
                href: routeKeys.kavappInventory(selectedCoffeeShopId),
                iconName: iconNames.package,
                iconColor: iconColors.destructive,
                label: "Kavapp Inventory",
            },
        ];
    }

    return [
        {
            href: routeKeys.home,
            iconName: iconNames.coffee,
            label: "Кав'ярні",
        },
        {
            href: routeKeys.settings,
            iconName: iconNames.settings,
            label: "Налаштування",
        },
        {
            href: routeKeys.plan,
            iconName: iconNames.crown,
            label: "Тариф",
        },
        {
            href: routeKeys.profileSettings,
            iconName: iconNames.users,
            label: "Profile",
        },
    ];
}
