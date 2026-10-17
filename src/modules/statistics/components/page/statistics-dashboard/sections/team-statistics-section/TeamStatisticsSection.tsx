import { useState } from "react";
import { MetricCard } from "@/shared/ui/metrics/metric-card/MetricCard";
import { formatUah } from "@/shared/utils/currency";
import { formatNumber } from "@/shared/utils/number";
import { Text } from "@/shared/ui/typography/text/Text";
import { textSizes } from "@/shared/ui/typography/text-size";
import { textWeights } from "@/shared/ui/typography/text-weight";
import { Select } from "@/shared/ui/select/Select";
import { EmployeeStat } from "@/modules/statistics/types/employee-stats";
import {
    getSortedEmployees,
    checkIsTopPerformer,
    getCardHighlightStyles,
    getCardIconName,
    hasMultipleEmployees,
} from "@/modules/statistics/components/page/statistics-dashboard/sections/team-statistics-section/TeamStatisticsSection.funcs";
import { TeamStatisticsSortMetric } from "@/modules/statistics/components/page/statistics-dashboard/sections/team-statistics-section/types";
import {
    employeeStatLabels,
    employeeStatProps,
    teamStatisticsSortOptions,
} from "@/modules/statistics/components/page/statistics-dashboard/sections/team-statistics-section/cosntants";

interface TeamStatisticsSectionProps {
    employees?: EmployeeStat[];
}

interface EmployeeStatisticsDescriptionProps {
    employees: EmployeeStat[];
    employee: EmployeeStat;
}

interface EmployeeStatisticsRowProps {
    label: string;
    value: string;
    valueClassName?: string;
}

export function TeamStatisticsSection({ employees }: TeamStatisticsSectionProps) {
    const [activeSortMetric, setActiveSortMetric] = useState<TeamStatisticsSortMetric>("default");

    if (!employees || employees.length === 0) return null;

    const sortedEmployeesList = getSortedEmployees(employees, activeSortMetric);
    const hasKavappData = employees.some((emp) => emp.averageCheck !== undefined);
    const availableSortOptions = teamStatisticsSortOptions.filter((option) => {
        if (
            option.value === employeeStatProps.averageChecksPerShift ||
            option.value === employeeStatProps.averageCheck ||
            option.value === employeeStatProps.averageItemsSoldPerShift ||
            option.value === employeeStatProps.averageItemsPerCheck
        ) {
            return hasKavappData;
        }

        return true;
    });

    const selectOptionsList = availableSortOptions.map((option) => ({
        value: option.value,
        label: option.label,
    }));

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Text uppercase className="tracking-wider">
                    Команда
                </Text>
                {hasMultipleEmployees(employees) && (
                    <div className="w-full sm:w-72">
                        <Select
                            label="Сортування за показником"
                            options={selectOptionsList}
                            value={activeSortMetric}
                            onValueChange={(value) => setActiveSortMetric(value as TeamStatisticsSortMetric)}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedEmployeesList.map((employee, employeeIndex) => {
                    const isTopEmployee = checkIsTopPerformer(employeeIndex, activeSortMetric);

                    return (
                        <MetricCard
                            key={employee.name}
                            title={`${employee.name} (${employee.shifts} зм.)`}
                            value={formatUah(employee.totalSalary)}
                            iconName={getCardIconName(isTopEmployee)}
                            className={getCardHighlightStyles(isTopEmployee)}
                            description={
                                <EmployeeStatisticsDescription employees={employees} employee={employee} />
                            }
                        />
                    );
                })}
            </div>
        </section>
    );
}

function EmployeeStatisticsDescription({ employees, employee }: EmployeeStatisticsDescriptionProps) {
    return (
        <div className="flex flex-col gap-2 pt-1">
            <Text textSize={textSizes.sm} className="text-gray-500">
                База: {formatUah(employee.basicSalary)}{" "}
                <span className="inline text-gray-500">| {employeeStatLabels.bonuses}: </span>
                <span className="inline text-emerald-500">+{formatUah(employee.bonuses)}</span>
            </Text>

            {hasMultipleEmployees(employees) && (
                <div className="flex flex-col gap-1.5 border-t border-gray-800/60 pt-2.5">
                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageRevenuePerShift}
                        value={formatUah(employee.averageRevenuePerShift)}
                    />

                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageCashRevenuePercent}
                        value={`${employee.averageCashRevenuePercent}%`}
                    />

                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageTerminalRevenuePercent}
                        value={`${employee.averageTerminalRevenuePercent}%`}
                    />

                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageNetProfit}
                        value={formatUah(employee.averageNetProfit)}
                        valueClassName="text-emerald-400"
                    />

                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageCostPercent}
                        value={`${employee.averageCostPercent}%`}
                    />

                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageWriteOffPercent}
                        value={`${employee.averageWriteOffPercent}%`}
                        valueClassName="text-rose-400"
                    />

                    <EmployeeStatisticsRow
                        label={employeeStatLabels.averageSalaryPercent}
                        value={`${employee.averageSalaryPercent}%`}
                    />

                    {employee.averageChecksPerShift && (
                        <EmployeeStatisticsRow
                            label={employeeStatLabels.averageChecksPerShift}
                            value={formatNumber(employee.averageChecksPerShift)}
                        />
                    )}

                    {employee.averageCheck && (
                        <EmployeeStatisticsRow
                            label={employeeStatLabels.averageCheck}
                            value={formatUah(employee.averageCheck)}
                        />
                    )}

                    {employee.averageItemsSoldPerShift && (
                        <EmployeeStatisticsRow
                            label={employeeStatLabels.averageItemsSoldPerShift}
                            value={formatNumber(employee.averageItemsSoldPerShift)}
                        />
                    )}

                    {employee.averageItemsPerCheck && (
                        <EmployeeStatisticsRow
                            label={employeeStatLabels.averageItemsPerCheck}
                            value={formatNumber(employee.averageItemsPerCheck, 2)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

function EmployeeStatisticsRow({
    label,
    value,
    valueClassName = "text-neutral-500",
}: EmployeeStatisticsRowProps) {
    return (
        <div className="flex items-center justify-between">
            <Text textSize={textSizes.sm} className="text-gray-500">
                {label}
            </Text>

            <Text textSize={textSizes.sm} textWeight={textWeights.medium} className={valueClassName}>
                {value}
            </Text>
        </div>
    );
}
