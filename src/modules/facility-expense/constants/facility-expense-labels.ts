import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";

export const facilityExpenseLabels: Record<keyof FacilityExpense, string> = {
    _id: "Id",
    title: "Назва",
    amount: "Сума",
    date: "Дата",
    period: "Період",
    description: "Опис",
    receiptUrl: "Чек",
    createdAt: "Створено",
    updatedAt: "Оновлено",
} as const;
