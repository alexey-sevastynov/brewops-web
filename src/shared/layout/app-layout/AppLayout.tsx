"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAllEmployees } from "@/modules/employee/model/employee-thunks";
import { getAllDailyReports } from "@/modules/daily-report/model/daily-report-thunks";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Sidebar } from "@/shared/layout/sidebar/Sidebar";
import { Toolbar } from "@/shared/layout/toolbar/Toolbar";
import { routeKeys } from "@/shared/constants/route-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { iconColors } from "@/shared/ui/icon/icon-color";
import { WorkspaceBootstrap } from "@/modules/workspace/components/WorkspaceBootstrap";

interface AppLayoutProps {
    children: React.ReactNode;
    userName: string;
}

export function AppLayout({ children, userName }: AppLayoutProps) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const coffeeShopId = getCoffeeShopIdFromPathname(pathname);
    const employees = useAppSelector((state) => state.employee.data);
    const employeeCoffeeShopId = useAppSelector((state) => state.employee.coffeeShopId);
    const isLoadingEmployees = useAppSelector((state) => state.employee.loading);
    const dailyReports = useAppSelector((state) => state.dailyReport.data);
    const dailyReportCoffeeShopId = useAppSelector((state) => state.dailyReport.coffeeShopId);
    const isLoadingDailyReports = useAppSelector((state) => state.dailyReport.loading);
    const coffeeShop = useAppSelector((state) =>
        state.coffeeShop.coffeeShops.find((item) => item._id === coffeeShopId),
    );
    const workspace = useAppSelector((state) =>
        state.workspace.workspaces.find((item) => item._id === state.workspace.selectedWorkspaceId),
    );

    useEffect(() => {
        if (!coffeeShopId) return;

        if (coffeeShopId !== employeeCoffeeShopId) dispatch(getAllEmployees(coffeeShopId));

        if (coffeeShopId !== dailyReportCoffeeShopId) dispatch(getAllDailyReports(coffeeShopId));
    }, [coffeeShopId, dailyReportCoffeeShopId, dispatch, employeeCoffeeShopId]);

    const sidebarNavigationItems = getSidebarNavigationItems(pathname, {
        hasEmployees: employeeCoffeeShopId === coffeeShopId && employees.length > 0,
        isLoadingEmployees,
        hasDailyReports: dailyReportCoffeeShopId === coffeeShopId && dailyReports.length > 0,
        isLoadingDailyReports,
        hasPaidPlan: workspace?.planKey !== undefined && workspace.planKey !== "free",
        hasKavappCredentials: Boolean(
            coffeeShop?.kavappEmail && coffeeShop.kavappPassword && coffeeShop.kavappPointId,
        ),
    });

    return (
        <div className="bg-background flex min-h-screen w-full">
            <Sidebar
                sidebarNavigationItems={sidebarNavigationItems}
                logoIconName={isCoffeeShopPath(pathname) ? iconNames.coffee : iconNames.hexagon}
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

function isCoffeeShopPath(pathname: string) {
    return pathname.startsWith("/coffee-shop/");
}

function getSidebarNavigationItems(
    pathname: string,
    employeeStatus: {
        hasEmployees: boolean;
        isLoadingEmployees: boolean;
        hasDailyReports: boolean;
        isLoadingDailyReports: boolean;
        hasPaidPlan: boolean;
        hasKavappCredentials: boolean;
    },
) {
    const coffeeShopId = getCoffeeShopIdFromPathname(pathname);

    if (coffeeShopId) return getCoffeeShopSidebarNavigationItems(coffeeShopId, employeeStatus);

    return [
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
            label: "Налаштування",
        },
    ];
}

function getCoffeeShopSidebarNavigationItems(
    coffeeShopId: string,
    employeeStatus: {
        hasEmployees: boolean;
        isLoadingEmployees: boolean;
        hasDailyReports: boolean;
        isLoadingDailyReports: boolean;
        hasPaidPlan: boolean;
        hasKavappCredentials: boolean;
    },
) {
    const employeesRequiredMessage = "Спочатку додайте працівників";
    const shouldDisableEmployeeDependentItems =
        employeeStatus.isLoadingEmployees || !employeeStatus.hasEmployees;
    const employeeRequiredItemProps = {
        disabled: shouldDisableEmployeeDependentItems,
        disabledMessage: employeesRequiredMessage,
    };
    const dashboardItemProps = getDashboardItemProps(employeeStatus, employeesRequiredMessage);
    const kavappDisabledMessage = !employeeStatus.hasPaidPlan
        ? "Kavapp Inventory доступний на платному тарифі"
        : "Заповніть Kavapp Email, пароль та Point ID у налаштуваннях кавʼярні";
    const kavappItemProps = {
        disabled:
            shouldDisableEmployeeDependentItems ||
            !employeeStatus.hasPaidPlan ||
            !employeeStatus.hasKavappCredentials,
        disabledMessage: shouldDisableEmployeeDependentItems
            ? employeesRequiredMessage
            : kavappDisabledMessage,
    };

    return [
        {
            href: routeKeys.coffeeShopHome(coffeeShopId),
            iconName: iconNames.coffee,
            label: "Кавʼярня",
        },
        {
            href: routeKeys.dashboard(coffeeShopId),
            iconName: iconNames.dashboard,
            label: "Dashboard",
            ...dashboardItemProps,
        },
        {
            href: routeKeys.employees(coffeeShopId),
            iconName: iconNames.users,
            label: "Працівники",
        },
        {
            href: routeKeys.dailyReports(coffeeShopId),
            iconName: iconNames.clipboardList,
            label: "Daily Reports",
            ...employeeRequiredItemProps,
        },
        {
            href: routeKeys.expenseReports(coffeeShopId),
            iconName: iconNames.wallet,
            label: "Expense Reports",
            ...employeeRequiredItemProps,
        },
        {
            href: routeKeys.facilityExpenses(coffeeShopId),
            iconName: iconNames.building2,
            label: "Facility Expenses",
            ...employeeRequiredItemProps,
        },
        {
            href: routeKeys.inventoryAudits(coffeeShopId),
            iconName: iconNames.clipboardCheck,
            label: "Inventory Audits",
            ...employeeRequiredItemProps,
        },
        {
            href: routeKeys.ownerWithdrawals(coffeeShopId),
            iconName: iconNames.handCoins,
            label: "Owner Withdrawals",
            ...employeeRequiredItemProps,
        },
        {
            href: routeKeys.kavappInventory(coffeeShopId),
            iconName: iconNames.package,
            iconColor: iconColors.destructive,
            label: "Kavapp Inventory",
            ...kavappItemProps,
        },
    ];
}

function getDashboardItemProps(
    employeeStatus: {
        hasEmployees: boolean;
        isLoadingEmployees: boolean;
        hasDailyReports: boolean;
        isLoadingDailyReports: boolean;
    },
    employeesRequiredMessage: string,
) {
    const disabled =
        employeeStatus.isLoadingEmployees ||
        employeeStatus.isLoadingDailyReports ||
        !employeeStatus.hasEmployees ||
        !employeeStatus.hasDailyReports;

    return {
        disabled,
        disabledMessage: !employeeStatus.hasEmployees
            ? employeesRequiredMessage
            : "Спочатку додайте денний звіт",
    };
}

function getCoffeeShopIdFromPathname(pathname: string) {
    if (!isCoffeeShopPath(pathname)) return null;

    return pathname.split("/")[2] || null;
}
