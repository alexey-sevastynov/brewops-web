"use client";

import { Sidebar } from "@/shared/layout/sidebar/Sidebar";
import { Toolbar } from "@/shared/layout/toolbar/Toolbar";
import { routeKeys } from "@/shared/constants/route-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { iconColors } from "@/shared/ui/icon/icon-color";
import { CoffeeShopContextGate } from "@/modules/coffee-shop/components/CoffeeShopContextGate";

interface CoffeeShopLayoutProps {
    children: React.ReactNode;
    userName?: string;
    userRole?: string;
    workspaceId?: string;
}

export function CoffeeShopLayout({ children, userName, userRole, workspaceId: _workspaceId }: CoffeeShopLayoutProps) {
    return (
        <div className="bg-background flex h-screen w-full overflow-hidden">
            <Sidebar
                sidebarNavigationItems={[
                    { href: routeKeys.coffeeShop, iconName: iconNames.dashboard, label: "Кавʼярня" },
                    { href: routeKeys.employees, iconName: iconNames.users, label: "Працівники" },
                    { href: routeKeys.dailyReports, iconName: iconNames.clipboardList, label: "Витрати" },
                    {
                        href: routeKeys.inventoryAudits,
                        iconName: iconNames.clipboardCheck,
                        label: "Аудит інвентаризації",
                    },
                    {
                        href: routeKeys.expenseReports,
                        iconName: iconNames.wallet,
                        label: "Операційні витрати",
                    },
                    {
                        href: routeKeys.facilityExpenses,
                        iconName: iconNames.building2,
                        label: "Витрати закладу",
                    },
                    {
                        href: routeKeys.ownerWithdrawals,
                        iconName: iconNames.handCoins,
                        label: "Виведення коштів",
                    },
                    {
                        href: routeKeys.kavappInventory,
                        iconName: iconNames.package,
                        iconColor: iconColors.destructive,
                        label: "Kavapp інвентаризація",
                    },
                ]}
                logoIconName={iconNames.coffee}
            />
            <div className="flex-1 overflow-auto">
                <Toolbar className="shrink-0" userName={userName} userRole={userRole} />
                <main className="p-4">
                    <CoffeeShopContextGate>{children}</CoffeeShopContextGate>
                </main>
            </div>
        </div>
    );
}
