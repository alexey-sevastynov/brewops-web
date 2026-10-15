import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";

export const inventoryAlertRuleLabels: Record<keyof InventoryAlertRule, string> = {
    _id: "Id",
    name: "Позиція",
    itemType: "Категорія",
    kavappItemId: "Унікальний номер",
    unit: "Одиниця вимірювання",
    threshold: "Мінімальний залишок",
    isIgnored: "Ігнорувати",
    description: "Примітка",
    createdAt: "Створено",
    updatedAt: "Оновлено",
} as const;
