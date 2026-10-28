import { ColumnDef } from "@tanstack/react-table";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { LinkCell } from "@/shared/ui/table/table-body/table-row/link-cell/LinkCell";
import {
    createDateTableColumn,
    createTableColumn,
} from "@/shared/lib/react-table/column/create-table-column";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";
import { inventoryAuditProps } from "@/modules/inventory-audit/constants/inventory-audit-props";
import { inventoryAuditLabels } from "@/modules/inventory-audit/constants/inventory-audit-labels";
import { CurrencyCell } from "@/shared/ui/table/table-body/table-row/currency-cell/CurrencyCell";
import { CurrencyFooterCell } from "@/shared/ui/table/table-footer/currency-footer-cell/CurrencyFooterCell";

export const inventoryAuditColumns: ColumnDef<InventoryAudit>[] = [
    createTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.title,
        header: inventoryAuditLabels.title,
        meta: {
            label: inventoryAuditLabels.title,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn({
        accessorKey: inventoryAuditProps.shortageAmount,
        header: () => <div className="w-full text-right">{inventoryAuditLabels.shortageAmount}</div>,
        cell: (cellInfo) => <CurrencyCell cellInfo={cellInfo} />,
        footer: (props) => <CurrencyFooterCell {...props} />,
        meta: {
            label: inventoryAuditLabels.shortageAmount,
            resourceFieldType: resourceFieldTypes.number,
            filterable: false,
        },
    }),
    createTableColumn({
        accessorKey: inventoryAuditProps.surplusAmount,
        header: () => <div className="w-full text-right">{inventoryAuditLabels.surplusAmount}</div>,
        cell: (cellInfo) => <CurrencyCell cellInfo={cellInfo} />,
        footer: (props) => <CurrencyFooterCell {...props} />,
        meta: {
            label: inventoryAuditLabels.surplusAmount,
            resourceFieldType: resourceFieldTypes.number,
            filterable: false,
        },
    }),
    createDateTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.validFrom,
        header: inventoryAuditLabels.validFrom,
    }),
    createDateTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.validTo,
        header: inventoryAuditLabels.validTo,
    }),
    createTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.receiptUrl,
        header: inventoryAuditLabels.receiptUrl,
        cell: (cellInfo) => <LinkCell cellInfo={cellInfo} text="Переглянути" />,
        meta: {
            label: inventoryAuditLabels.receiptUrl,
            resourceFieldType: resourceFieldTypes.text,
            filterable: false,
        },
    }),
    createTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.description,
        header: inventoryAuditLabels.description,
        meta: {
            label: inventoryAuditLabels.description,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createDateTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.createdAt,
        header: inventoryAuditLabels.createdAt,
    }),
    createDateTableColumn<InventoryAudit>({
        accessorKey: inventoryAuditProps.updatedAt,
        header: inventoryAuditLabels.updatedAt,
    }),
];
