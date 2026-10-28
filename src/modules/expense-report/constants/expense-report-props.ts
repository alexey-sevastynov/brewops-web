import { nameOf } from "@/shared/utils/name-of";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";

export const expenseReportProps: Record<keyof ExpenseReport, string> = {
    _id: nameOf<ExpenseReport>("_id"),
    title: nameOf<ExpenseReport>("title"),
    amount: nameOf<ExpenseReport>("amount"),
    type: nameOf<ExpenseReport>("type"),
    date: nameOf<ExpenseReport>("date"),
    validFrom: nameOf<ExpenseReport>("validFrom"),
    validTo: nameOf<ExpenseReport>("validTo"),
    description: nameOf<ExpenseReport>("description"),
    receiptUrl: nameOf<ExpenseReport>("receiptUrl"),
    createdAt: nameOf<ExpenseReport>("createdAt"),
    updatedAt: nameOf<ExpenseReport>("updatedAt"),
} as const;
