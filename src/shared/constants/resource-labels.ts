import { resourceNames, ResourceName } from "@/shared/constants/resource-names";

export const resourceLabels: Record<ResourceName, string> = {
    [resourceNames.dailyReports]: "Звіти змін",
    [resourceNames.employees]: "Співробітники",
    [resourceNames.expenseReports]: "Звіти витрат",
    [resourceNames.inventoryAudits]: "Аудити складу",
    [resourceNames.facilityExpenses]: "Комунальні/Аренда",
    [resourceNames.ownerWithdrawals]: "Виведення коштів",
    [resourceNames.kavapp]: "Інтеграція KavApp",
    [resourceNames.statistics]: "Статистика",
} as const;
