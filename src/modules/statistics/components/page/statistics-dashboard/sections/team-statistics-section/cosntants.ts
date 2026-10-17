import { EmployeeStat } from "@/modules/statistics/types/employee-stats";
import { nameOf } from "@/shared/utils/name-of";

export const employeeStatProps: Record<keyof EmployeeStat, string> = {
    name: nameOf<EmployeeStat>("name"),
    shifts: nameOf<EmployeeStat>("shifts"),
    basicSalary: nameOf<EmployeeStat>("basicSalary"),
    bonuses: nameOf<EmployeeStat>("bonuses"),
    totalSalary: nameOf<EmployeeStat>("totalSalary"),
    averageRevenuePerShift: nameOf<EmployeeStat>("averageRevenuePerShift"),
    averageCashRevenuePercent: nameOf<EmployeeStat>("averageCashRevenuePercent"),
    averageTerminalRevenuePercent: nameOf<EmployeeStat>("averageTerminalRevenuePercent"),
    averageNetProfit: nameOf<EmployeeStat>("averageNetProfit"),
    averageCostPercent: nameOf<EmployeeStat>("averageCostPercent"),
    averageWriteOffPercent: nameOf<EmployeeStat>("averageWriteOffPercent"),
    averageSalaryPercent: nameOf<EmployeeStat>("averageSalaryPercent"),
    averageChecksPerShift: nameOf<EmployeeStat>("averageChecksPerShift"),
    averageCheck: nameOf<EmployeeStat>("averageCheck"),
    averageItemsSoldPerShift: nameOf<EmployeeStat>("averageItemsSoldPerShift"),
    averageItemsPerCheck: nameOf<EmployeeStat>("averageItemsPerCheck"),
} as const;

export const employeeStatLabels: Record<keyof EmployeeStat, string> = {
    name: "Ім'я",
    shifts: "Зміни",
    basicSalary: "База",
    bonuses: "Бонуси",
    totalSalary: "Загальна зарплата",
    averageRevenuePerShift: "Середня виручка / зміна",
    averageCashRevenuePercent: "Середня частка готівки",
    averageTerminalRevenuePercent: "Середня частка терміналу",
    averageNetProfit: "Середній операційний прибуток",
    averageCostPercent: "Середня частка собівартості",
    averageWriteOffPercent: "Середня частка списань",
    averageSalaryPercent: "Середня частка зарплати",
    averageChecksPerShift: "Середня кількість чеків / зміна",
    averageCheck: "Середній чек",
    averageItemsSoldPerShift: "Продано позицій / зміна",
    averageItemsPerCheck: "Позицій у чеку",
} as const;

export const teamStatisticsSortOptions = [
    { value: "default", label: "Без сортування" },
    { value: employeeStatProps.averageRevenuePerShift, label: employeeStatLabels.averageRevenuePerShift },
    { value: employeeStatProps.averageNetProfit, label: employeeStatLabels.averageNetProfit },
    { value: employeeStatProps.averageChecksPerShift, label: employeeStatLabels.averageChecksPerShift },
    { value: employeeStatProps.averageCheck, label: employeeStatLabels.averageCheck },
    { value: employeeStatProps.averageItemsSoldPerShift, label: employeeStatLabels.averageItemsSoldPerShift },
    { value: employeeStatProps.averageItemsPerCheck, label: employeeStatLabels.averageItemsPerCheck },
    { value: employeeStatProps.averageCostPercent, label: employeeStatLabels.averageCostPercent },
    { value: employeeStatProps.averageWriteOffPercent, label: employeeStatLabels.averageWriteOffPercent },
    { value: employeeStatProps.averageSalaryPercent, label: employeeStatLabels.averageSalaryPercent },
] as const;
