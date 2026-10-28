import { nameOf } from "@/shared/utils/name-of";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";

export const inventoryAuditProps: Record<keyof InventoryAudit, string> = {
    _id: nameOf<InventoryAudit>("_id"),
    title: nameOf<InventoryAudit>("title"),
    shortageAmount: nameOf<InventoryAudit>("shortageAmount"),
    surplusAmount: nameOf<InventoryAudit>("surplusAmount"),
    validFrom: nameOf<InventoryAudit>("validFrom"),
    validTo: nameOf<InventoryAudit>("validTo"),
    description: nameOf<InventoryAudit>("description"),
    receiptUrl: nameOf<InventoryAudit>("receiptUrl"),
    createdAt: nameOf<InventoryAudit>("createdAt"),
    updatedAt: nameOf<InventoryAudit>("updatedAt"),
} as const;
