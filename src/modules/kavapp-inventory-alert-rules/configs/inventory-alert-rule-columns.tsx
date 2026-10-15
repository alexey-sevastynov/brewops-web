import { ColumnDef } from "@tanstack/react-table";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import { kavappInventoryCategoryLabels } from "@/modules/kavapp-inventory/constants/kavapp-inventory-category";
import { inventoryAlertRuleProps } from "@/modules/kavapp-inventory-alert-rules/constants/inventory-alert-rule-props";
import { inventoryAlertRuleLabels } from "@/modules/kavapp-inventory-alert-rules/constants/inventory-alert-rule-labels";
import { KavappInventoryCategoryKey } from "@/modules/kavapp-inventory/enums/kavapp-inventory-category-key";
import { BooleanCell } from "@/shared/ui/table/table-body/table-row/boolean-cell/BooleanCell";

export const inventoryAlertRuleColumns: ColumnDef<InventoryAlertRule>[] = [
    createTableColumn<InventoryAlertRule>({
        accessorKey: inventoryAlertRuleProps.name,
        header: inventoryAlertRuleLabels.name,
        meta: {
            label: inventoryAlertRuleLabels.name,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<InventoryAlertRule>({
        accessorKey: inventoryAlertRuleProps.itemType,
        header: inventoryAlertRuleLabels.itemType,
        cell: ({ getValue }) => kavappInventoryCategoryLabels[getValue() as KavappInventoryCategoryKey],
        meta: {
            label: inventoryAlertRuleLabels.itemType,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn<InventoryAlertRule>({
        accessorKey: inventoryAlertRuleProps.isIgnored,
        header: inventoryAlertRuleLabels.isIgnored,
        cell: (cellInfo) => <BooleanCell cellInfo={cellInfo} />,
        meta: {
            label: inventoryAlertRuleLabels.isIgnored,
            resourceFieldType: resourceFieldTypes.checkbox,
            filterable: true,
        },
    }),
    createTableColumn<InventoryAlertRule>({
        accessorKey: inventoryAlertRuleProps.threshold,
        header: inventoryAlertRuleLabels.threshold,
        cell: ({ row }) => {
            if (row.original.isIgnored) {
                return <span className="text-muted-foreground">—</span>;
            }

            return row.original.threshold;
        },
        meta: {
            label: inventoryAlertRuleLabels.threshold,
            resourceFieldType: resourceFieldTypes.number,
            filterable: false,
        },
    }),
    createTableColumn<InventoryAlertRule>({
        accessorKey: inventoryAlertRuleProps.unit,
        header: inventoryAlertRuleLabels.unit,
        cell: (cellInfo) => cellInfo.getValue(),
        meta: {
            label: inventoryAlertRuleLabels.unit,
            resourceFieldType: resourceFieldTypes.number,
            filterable: false,
        },
    }),
    createTableColumn<InventoryAlertRule>({
        accessorKey: inventoryAlertRuleProps.description,
        header: inventoryAlertRuleLabels.description,
        meta: {
            label: inventoryAlertRuleLabels.description,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
];
