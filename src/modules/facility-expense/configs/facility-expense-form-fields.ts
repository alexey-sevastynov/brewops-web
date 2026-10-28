import { ResourceField } from "@/shared/types/resource-field";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { facilityExpenseLabels } from "@/modules/facility-expense/constants/facility-expense-labels";
import { facilityExpenseProps } from "@/modules/facility-expense/constants/facility-expense-props";

export const facilityExpenseFormFields: ResourceField<FacilityExpense>[] = [
    {
        name: facilityExpenseProps.title as keyof FacilityExpense,
        required: true,
        label: facilityExpenseLabels.title,
        type: resourceFieldTypes.text,
    },
    {
        name: facilityExpenseProps.amount as keyof FacilityExpense,
        required: true,
        label: facilityExpenseLabels.amount,
        type: resourceFieldTypes.number,
    },
    {
        name: facilityExpenseProps.date as keyof FacilityExpense,
        required: true,
        label: facilityExpenseLabels.date,
        type: resourceFieldTypes.date,
    },
    {
        name: facilityExpenseProps.period as keyof FacilityExpense,
        required: true,
        label: facilityExpenseLabels.period,
        type: resourceFieldTypes.date,
    },
    {
        name: facilityExpenseProps.description as keyof FacilityExpense,
        label: facilityExpenseLabels.description,
        type: resourceFieldTypes.text,
    },
    {
        name: facilityExpenseProps.receiptUrl as keyof FacilityExpense,
        label: facilityExpenseLabels.receiptUrl,
        type: resourceFieldTypes.text,
    },
];
