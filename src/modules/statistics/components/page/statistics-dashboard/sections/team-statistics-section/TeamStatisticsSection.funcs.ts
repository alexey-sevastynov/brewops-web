import { EmployeeStat } from "@/modules/statistics/types/employee-stats";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { TeamStatisticsSortMetric } from "@/modules/statistics/components/page/statistics-dashboard/sections/team-statistics-section/types";
import { employeeStatProps } from "@/modules/statistics/components/page/statistics-dashboard/sections/team-statistics-section/cosntants";
import { typeNames } from "@/shared/enums/type-name";

type NumericKey<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

type SortDirection = "ascending" | "descending";

function isNumericKey<T>(object: T, key: PropertyKey): key is NumericKey<T> {
    return typeof object[key as keyof T] === typeNames.number;
}

function getSortDirection(metric: TeamStatisticsSortMetric): SortDirection {
    switch (metric) {
        case employeeStatProps.averageCostPercent:
        case employeeStatProps.averageWriteOffPercent:
        case employeeStatProps.averageSalaryPercent:
            return "ascending";

        default:
            return "descending";
    }
}

function getEmployeeMetricValue(employee: EmployeeStat, metric: TeamStatisticsSortMetric): number {
    if (isNumericKey(employee, metric)) {
        const value = employee[metric];

        return value;
    }

    return 0;
}

function compareEmployeeValues(firstValue: number, secondValue: number, direction: SortDirection): number {
    const difference = firstValue - secondValue;

    if (direction === "ascending") {
        return difference;
    }

    return -difference;
}

function compareEmployees(
    firstEmployee: EmployeeStat,
    secondEmployee: EmployeeStat,
    metric: TeamStatisticsSortMetric,
    direction: SortDirection,
): number {
    const firstValue = getEmployeeMetricValue(firstEmployee, metric);
    const secondValue = getEmployeeMetricValue(secondEmployee, metric);

    const comparison = compareEmployeeValues(firstValue, secondValue, direction);

    return comparison;
}

export function getSortedEmployees(employees: EmployeeStat[], activeSortMetric: TeamStatisticsSortMetric) {
    const sortedEmployees = [...employees];

    if (activeSortMetric === "default") {
        return sortedEmployees;
    }

    const direction = getSortDirection(activeSortMetric);

    sortedEmployees.sort((firstEmployee, secondEmployee) => {
        const comparison = compareEmployees(firstEmployee, secondEmployee, activeSortMetric, direction);

        return comparison;
    });

    return sortedEmployees;
}

export function checkIsTopPerformer(cardIndex: number, activeSortMetric: TeamStatisticsSortMetric) {
    const isFirstCard = cardIndex === 0;
    const isSortingActive = activeSortMetric !== "default";

    return isFirstCard && isSortingActive;
}

export function getCardHighlightStyles(isTopPerformer: boolean) {
    if (!isTopPerformer) {
        return "bg-card";
    }

    return [
        "border-amber-400 dark:border-amber-500/30",
        "bg-amber-50/40 dark:bg-amber-950/20",
        "shadow-md shadow-amber-100/40 dark:shadow-none",
    ].join(" ");
}

export function getCardIconName(isTopPerformer: boolean) {
    return isTopPerformer ? iconNames.crown : iconNames.users;
}

export function hasMultipleEmployees(employees: EmployeeStat[]) {
    return employees.length > 1;
}
