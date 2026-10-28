import { nameOf } from "@/shared/utils/name-of";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";

export const facilityExpenseProps: Record<keyof FacilityExpense, string> = {
    _id: nameOf<FacilityExpense>("_id"),
    title: nameOf<FacilityExpense>("title"),
    amount: nameOf<FacilityExpense>("amount"),
    date: nameOf<FacilityExpense>("date"),
    period: nameOf<FacilityExpense>("period"),
    description: nameOf<FacilityExpense>("description"),
    receiptUrl: nameOf<FacilityExpense>("receiptUrl"),
    createdAt: nameOf<FacilityExpense>("createdAt"),
    updatedAt: nameOf<FacilityExpense>("updatedAt"),
} as const;
