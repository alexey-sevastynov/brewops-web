import { ColumnDef } from "@tanstack/react-table";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { LinkCell } from "@/shared/ui/table/table-body/table-row/link-cell/LinkCell";
import {
    createDateTableColumn,
    createTableColumn,
} from "@/shared/lib/react-table/column/create-table-column";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";
import { facilityExpenseProps } from "@/modules/facility-expense/constants/facility-expense-props";
import { facilityExpenseLabels } from "@/modules/facility-expense/constants/facility-expense-labels";
import { formatDateToMonth } from "@/shared/utils/date";
import { CurrencyFooterCell } from "@/shared/ui/table/table-footer/currency-footer-cell/CurrencyFooterCell";
import { CurrencyCell } from "@/shared/ui/table/table-body/table-row/currency-cell/CurrencyCell";

export const facilityExpenseColumns: ColumnDef<FacilityExpense>[] = [
    createTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.title,
        header: facilityExpenseLabels.title,
        meta: {
            label: facilityExpenseLabels.title,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn({
        accessorKey: facilityExpenseProps.amount,
        header: () => <div className="w-full text-right">{facilityExpenseLabels.amount}</div>,
        cell: (cellInfo) => <CurrencyCell cellInfo={cellInfo} />,
        footer: (props) => <CurrencyFooterCell {...props} />,
        meta: {
            label: facilityExpenseLabels.amount,
            resourceFieldType: resourceFieldTypes.number,
            filterable: false,
        },
    }),
    createDateTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.date,
        accessorFn: (row) => new Date(row.date),
        header: facilityExpenseLabels.date,
        filterable: true,
    }),
    createDateTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.period,
        accessorFn: (row) => new Date(row.period),
        header: facilityExpenseLabels.period,
        filterable: true,
        formatter: formatDateToMonth,
    }),
    createTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.receiptUrl,
        header: facilityExpenseLabels.receiptUrl,
        cell: (cellInfo) => <LinkCell cellInfo={cellInfo} text="Переглянути" />,
        meta: {
            label: facilityExpenseLabels.receiptUrl,
            resourceFieldType: resourceFieldTypes.text,
            filterable: false,
        },
    }),
    createTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.description,
        header: facilityExpenseLabels.description,
        meta: {
            label: facilityExpenseLabels.description,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createDateTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.createdAt,
        header: facilityExpenseLabels.createdAt,
    }),
    createDateTableColumn<FacilityExpense>({
        accessorKey: facilityExpenseProps.updatedAt,
        header: facilityExpenseLabels.updatedAt,
    }),
];
