import { ResourceField } from "@/shared/types/resource-field";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import { inventoryAlertRuleProps } from "@/modules/kavapp-inventory-alert-rules/constants/inventory-alert-rule-props";
import { inventoryAlertRuleLabels } from "@/modules/kavapp-inventory-alert-rules/constants/inventory-alert-rule-labels";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { Option } from "@/shared/types/ui/option";

export const createInventoryAlertRuleFields = (
    catalogOptions: Option[],
): ResourceField<InventoryAlertRule>[] => [
    {
        name: inventoryAlertRuleProps.name as keyof InventoryAlertRule,
        required: true,
        label: inventoryAlertRuleLabels.name,
        type: resourceFieldTypes.select,
        options: catalogOptions,
    },
    {
        name: inventoryAlertRuleProps.isIgnored as keyof InventoryAlertRule,
        required: false,
        label: inventoryAlertRuleLabels.isIgnored,
        type: resourceFieldTypes.checkbox,
    },
    {
        name: inventoryAlertRuleProps.threshold as keyof InventoryAlertRule,
        required: false,
        label: inventoryAlertRuleLabels.threshold,
        type: resourceFieldTypes.number,
    },
    {
        name: inventoryAlertRuleProps.description as keyof InventoryAlertRule,
        required: false,
        label: inventoryAlertRuleLabels.description,
        type: resourceFieldTypes.text,
    },
];
