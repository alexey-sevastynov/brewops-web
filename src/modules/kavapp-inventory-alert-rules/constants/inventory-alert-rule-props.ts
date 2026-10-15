import { nameOf } from "@/shared/utils/name-of";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";

export const inventoryAlertRuleProps: Record<keyof InventoryAlertRule, string> = {
    _id: nameOf<InventoryAlertRule>("_id"),
    name: nameOf<InventoryAlertRule>("name"),
    itemType: nameOf<InventoryAlertRule>("itemType"),
    kavappItemId: nameOf<InventoryAlertRule>("kavappItemId"),
    unit: nameOf<InventoryAlertRule>("unit"),
    threshold: nameOf<InventoryAlertRule>("threshold"),
    isIgnored: nameOf<InventoryAlertRule>("isIgnored"),
    description: nameOf<InventoryAlertRule>("description"),
    createdAt: nameOf<InventoryAlertRule>("createdAt"),
    updatedAt: nameOf<InventoryAlertRule>("updatedAt"),
} as const;
