"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Sidebar } from "@/shared/layout/sidebar/Sidebar";
import { Toolbar } from "@/shared/layout/toolbar/Toolbar";
import { routeKeys } from "@/shared/constants/route-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { iconColors } from "@/shared/ui/icon/icon-color";
import { routeLabels } from "@/shared/constants/route-labels";
import { SidebarNavigationItemConfig } from "@/shared/layout/sidebar/types/sidebar-navigation-item";
import { resourceNames, ResourceName } from "@/shared/constants/resource-names";
import { permissionActions } from "@/shared/enums/permission-action";
import { setSelectedWorkspaceId } from "@/modules/workspace/model/workspace-slice";
import { WorkspaceBootstrap } from "@/modules/workspace/components/WorkspaceBootstrap";
import { isOwnerOrAdminRole } from "@/modules/workspace/utils/guards";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { selectWorkspaceByCoffeeShopId } from "@/modules/workspace/model/workspace-selectors";
import { workspacePlanKeys } from "@/modules/workspace/constants/workspace-plan-keys";
import { selectCoffeeShopById } from "@/modules/coffee-shop/model/coffee-shop-selectors";

interface AppLayoutProps {
    children: React.ReactNode;
    userName: string;
}

interface CoffeeShopSidebarNavigationItem extends SidebarNavigationItemConfig {
    resourceKey?: ResourceName;
}

export function AppLayout({ children, userName }: AppLayoutProps) {
    const params = useParams<{ coffeeShopId: string | undefined }>();

    const dispatch = useAppDispatch();
    const coffeeShop = useAppSelector((state) => selectCoffeeShopById(state, params.coffeeShopId));
    const selectedWorkspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const currentWorkspace = useAppSelector((state) =>
        selectWorkspaceByCoffeeShopId(state, params.coffeeShopId ?? null),
    );
    const isFreePlan = currentWorkspace?.planKey === workspacePlanKeys.free;

    useEffect(() => {
        if (!params.coffeeShopId) return;

        if (coffeeShop?.workspaceId && coffeeShop.workspaceId !== selectedWorkspaceId) {
            dispatch(setSelectedWorkspaceId(coffeeShop.workspaceId));
        }
    }, [params.coffeeShopId, coffeeShop?.workspaceId, selectedWorkspaceId, dispatch]);

    return (
        <div className="bg-background flex min-h-screen w-full">
            <Sidebar
                sidebarNavigationItems={getSidebarNavigationItems(
                    params.coffeeShopId,
                    coffeeShop?.myAccess?.role,
                    coffeeShop?.myAccess?.permissions,
                    isFreePlan,
                )}
                logoIconName={params.coffeeShopId ? iconNames.coffee : iconNames.hexagon}
            />
            <div className="flex-1 overflow-auto">
                <Toolbar className="shrink-0" userName={userName} />
                <main className="p-4">
                    <WorkspaceBootstrap>{children}</WorkspaceBootstrap>
                </main>
            </div>
        </div>
    );
}

function getSidebarNavigationItems(
    coffeeShopId?: string,
    userRole?: WorkspaceRoleKey,
    permissions?: string[],
    isFreePlan?: boolean,
) {
    if (coffeeShopId) {
        return getCoffeeShopSidebarNavigationItems(coffeeShopId, userRole, permissions, isFreePlan);
    }

    const sidebarNavigationItems: SidebarNavigationItemConfig[] = [
        {
            href: routeKeys.home,
            iconName: iconNames.store,
            label: "Кав'ярні",
        },
        {
            href: routeKeys.plan,
            iconName: iconNames.crown,
            label: "Тариф",
        },
        {
            href: routeKeys.settings,
            iconName: iconNames.settings,
            label: routeLabels.settings,
        },
    ];

    return sidebarNavigationItems;
}

function getCoffeeShopSidebarNavigationItems(
    coffeeShopId: string,
    userRole?: WorkspaceRoleKey,
    permissions?: string[],
    isFreePlan?: boolean,
) {
    const coffeeShopSidebarNavigationItem: CoffeeShopSidebarNavigationItem[] = [
        {
            href: routeKeys.coffeeShopHome(coffeeShopId),
            iconName: iconNames.coffee,
            label: routeLabels.coffeeShopHome,
        },
        {
            href: routeKeys.dashboard(coffeeShopId),
            iconName: iconNames.dashboard,
            label: routeLabels.dashboard,
            resourceKey: resourceNames.statistics,
        },
        {
            href: routeKeys.employees(coffeeShopId),
            iconName: iconNames.users,
            label: routeLabels.employees,
            resourceKey: resourceNames.employees,
        },
        {
            href: routeKeys.dailyReports(coffeeShopId),
            iconName: iconNames.clipboardList,
            label: routeLabels.dailyReports,
            resourceKey: resourceNames.dailyReports,
        },
        {
            href: routeKeys.expenseReports(coffeeShopId),
            iconName: iconNames.wallet,
            label: routeLabels.expenseReports,
            resourceKey: resourceNames.expenseReports,
        },
        {
            href: routeKeys.facilityExpenses(coffeeShopId),
            iconName: iconNames.building2,
            label: routeLabels.facilityExpenses,
            resourceKey: resourceNames.facilityExpenses,
        },
        {
            href: routeKeys.inventoryAudits(coffeeShopId),
            iconName: iconNames.clipboardCheck,
            label: routeLabels.inventoryAudits,
            resourceKey: resourceNames.inventoryAudits,
        },
        {
            href: routeKeys.ownerWithdrawals(coffeeShopId),
            iconName: iconNames.handCoins,
            label: routeLabels.ownerWithdrawals,
            resourceKey: resourceNames.ownerWithdrawals,
        },
        ...(!isFreePlan
            ? [
                  {
                      href: routeKeys.kavappInventory(coffeeShopId),
                      iconName: iconNames.package,
                      iconColor: iconColors.destructive,
                      label: routeLabels.kavappInventory,
                      resourceKey: resourceNames.kavapp,
                  },
              ]
            : []),
    ];

    return filterSidebarItemsByAccess(coffeeShopSidebarNavigationItem, userRole, permissions);
}

function filterSidebarItemsByAccess(
    items: CoffeeShopSidebarNavigationItem[],
    userRole?: WorkspaceRoleKey,
    permissions?: string[],
) {
    if (!userRole || isOwnerOrAdminRole(userRole)) return items;

    return items.filter((item) => {
        if (!item.resourceKey) return true;

        return hasResourcePermission(item.resourceKey, permissions);
    });
}

function hasResourcePermission(resourceKey: ResourceName, permissions: string[] = []) {
    return (
        permissions.includes("*:*") ||
        permissions.includes(resourceKey) ||
        permissions.includes(`${resourceKey}:${permissionActions.read}`) ||
        permissions.includes(`${resourceKey}:${permissionActions.write}`) ||
        permissions.includes(`${resourceKey}:${permissionActions.delete}`)
    );
}
