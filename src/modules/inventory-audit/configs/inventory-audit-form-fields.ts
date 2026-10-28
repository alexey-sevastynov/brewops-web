import { ResourceField } from "@/shared/types/resource-field";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";
import { inventoryAuditLabels } from "@/modules/inventory-audit/constants/inventory-audit-labels";
import { inventoryAuditProps } from "@/modules/inventory-audit/constants/inventory-audit-props";

export const inventoryAuditFormFields: ResourceField<InventoryAudit>[] = [
    {
        name: inventoryAuditProps.title as keyof InventoryAudit,
        required: true,
        label: inventoryAuditLabels.title,
        type: resourceFieldTypes.text,
    },
    {
        name: inventoryAuditProps.shortageAmount as keyof InventoryAudit,
        required: true,
        label: inventoryAuditLabels.shortageAmount,
        type: resourceFieldTypes.number,
    },
    {
        name: inventoryAuditProps.surplusAmount as keyof InventoryAudit,
        required: true,
        label: inventoryAuditLabels.surplusAmount,
        type: resourceFieldTypes.number,
    },
    {
        name: inventoryAuditProps.validFrom as keyof InventoryAudit,
        required: true,
        label: inventoryAuditLabels.validFrom,
        type: resourceFieldTypes.date,
    },
    {
        name: inventoryAuditProps.validTo as keyof InventoryAudit,
        required: true,
        label: inventoryAuditLabels.validTo,
        type: resourceFieldTypes.date,
    },
    {
        name: inventoryAuditProps.receiptUrl as keyof InventoryAudit,
        label: inventoryAuditLabels.receiptUrl,
        type: resourceFieldTypes.text,
    },
    {
        name: inventoryAuditProps.description as keyof InventoryAudit,
        label: inventoryAuditLabels.description,
        type: resourceFieldTypes.text,
    },
];
