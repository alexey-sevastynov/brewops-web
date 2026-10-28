import { ColumnDef } from "@tanstack/react-table";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { BadgeCell } from "@/shared/ui/table/table-body/table-row/badge-cell/BadgeCell";
import { LinkCell } from "@/shared/ui/table/table-body/table-row/link-cell/LinkCell";
import {
    createDateTableColumn,
    createTableColumn,
} from "@/shared/lib/react-table/column/create-table-column";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";
import { expenseReportProps } from "@/modules/expense-report/constants/expense-report-props";
import { expenseReportLabels } from "@/modules/expense-report/constants/expense-report-labels";
import { expenseReportTypeLabels } from "@/modules/expense-report/constants/expense-report-type-labels";
import { CurrencyCell } from "@/shared/ui/table/table-body/table-row/currency-cell/CurrencyCell";
import { CurrencyFooterCell } from "@/shared/ui/table/table-footer/currency-footer-cell/CurrencyFooterCell";

export const expenseReportColumns: ColumnDef<ExpenseReport>[] = [
    createTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.title,
        header: expenseReportLabels.title,
        meta: {
            label: expenseReportLabels.title,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.type,
        header: expenseReportLabels.type,
        cell: (cellInfo) => <BadgeCell cellInfo={cellInfo} labels={expenseReportTypeLabels} />,
        meta: {
            label: expenseReportLabels.type,
            resourceFieldType: resourceFieldTypes.select,
            filterable: true,
        },
    }),
    createTableColumn({
        accessorKey: expenseReportProps.amount,
        header: () => <div className="w-full text-right">{expenseReportLabels.amount}</div>,
        cell: (cellInfo) => <CurrencyCell cellInfo={cellInfo} />,
        footer: (props) => <CurrencyFooterCell {...props} />,
        meta: {
            label: expenseReportLabels.amount,
            resourceFieldType: resourceFieldTypes.number,
            filterable: false,
        },
    }),
    createDateTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.date,
        accessorFn: (row) => (row.date ? new Date(row.date) : null),
        header: expenseReportLabels.date,
        filterable: true,
    }),
    createDateTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.validFrom,
        header: expenseReportLabels.validFrom,
    }),
    createDateTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.validTo,
        header: expenseReportLabels.validTo,
    }),
    createTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.receiptUrl,
        header: expenseReportLabels.receiptUrl,
        cell: (cellInfo) => <LinkCell cellInfo={cellInfo} text="Переглянути" />,
        meta: {
            label: expenseReportLabels.receiptUrl,
            resourceFieldType: resourceFieldTypes.text,
            filterable: false,
        },
    }),
    createTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.description,
        header: expenseReportLabels.description,
        meta: {
            label: expenseReportLabels.description,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createDateTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.createdAt,
        header: expenseReportLabels.createdAt,
    }),
    createDateTableColumn<ExpenseReport>({
        accessorKey: expenseReportProps.updatedAt,
        header: expenseReportLabels.updatedAt,
    }),
];
