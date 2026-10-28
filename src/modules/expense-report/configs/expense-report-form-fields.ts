import { ResourceField } from "@/shared/types/resource-field";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { expenseReportLabels } from "@/modules/expense-report/constants/expense-report-labels";
import { expenseReportProps } from "@/modules/expense-report/constants/expense-report-props";
import { expenseReportTypes } from "@/modules/expense-report/enums/expense-report-type";
import { expenseReportTypeLabels } from "@/modules/expense-report/constants/expense-report-type-labels";

export const expenseReportFormFields: ResourceField<ExpenseReport>[] = [
    {
        name: expenseReportProps.title as keyof ExpenseReport,
        required: true,
        label: expenseReportLabels.title,
        type: resourceFieldTypes.text,
    },
    {
        name: expenseReportProps.amount as keyof ExpenseReport,
        required: true,
        label: expenseReportLabels.amount,
        type: resourceFieldTypes.number,
    },
    {
        name: expenseReportProps.type as keyof ExpenseReport,
        required: true,
        label: expenseReportLabels.type,
        type: resourceFieldTypes.select,
        options: Object.entries(expenseReportTypes).map(([, value]) => ({
            value,
            label: expenseReportTypeLabels[value],
        })),
    },
    {
        name: expenseReportProps.date as keyof ExpenseReport,
        label: expenseReportLabels.date,
        type: resourceFieldTypes.date,
    },
    {
        name: expenseReportProps.validFrom as keyof ExpenseReport,
        label: expenseReportLabels.validFrom,
        type: resourceFieldTypes.date,
    },
    {
        name: expenseReportProps.validTo as keyof ExpenseReport,
        label: expenseReportLabels.validTo,
        type: resourceFieldTypes.date,
    },
    {
        name: expenseReportProps.description as keyof ExpenseReport,
        label: expenseReportLabels.description,
        type: resourceFieldTypes.text,
    },
    {
        name: expenseReportProps.receiptUrl as keyof ExpenseReport,
        label: expenseReportLabels.receiptUrl,
        type: resourceFieldTypes.text,
    },
];
