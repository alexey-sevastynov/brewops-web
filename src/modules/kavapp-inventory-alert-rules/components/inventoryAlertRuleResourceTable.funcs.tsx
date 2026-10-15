import { KavappCatalogItem } from "@/modules/kavapp-inventory/types/kavapp-catalog-item";
import {
    InventoryAlertRule,
    InventoryAlertRulePayload,
} from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import { kavappInventoryCategoryLabels } from "@/modules/kavapp-inventory/constants/kavapp-inventory-category";
import { Option } from "@/shared/types/ui/option";
import { kavappInventoryUnitLabels } from "@/modules/kavapp-inventory/constants/kavapp-inventory-unit-labels";

export function createInventoryAlertRuleCatalogOptions(
    kavappCatalogItems: KavappCatalogItem[],
    inventoryAlertRules: InventoryAlertRule[],
) {
    const options: Option[] = [];

    for (const item of kavappCatalogItems) {
        const value = `${item.type}:${item.id}`;

        const isCreated = inventoryAlertRules.some(
            (rule) => `${rule.itemType}:${rule.kavappItemId}` === value,
        );

        const unitLabel = ` (${kavappInventoryUnitLabels[item.units as 1 | 2 | 4]})`;

        options.push({
            value,
            label: `${kavappInventoryCategoryLabels[item.type]} — ${item.name}${unitLabel}`,
            disabled: isCreated,
        });
    }

    return options;
}

export function prepareRulePayload(
    inventoryAlertRule: InventoryAlertRule,
    kavappCatalogItems: KavappCatalogItem[],
) {
    const kavappCatalogItem = findKavappCatalogItem(inventoryAlertRule, kavappCatalogItems);

    return createInventoryAlertRulePayload(inventoryAlertRule, kavappCatalogItem);
}

export function getInventoryAlertRuleUnit(inventoryItem: string, kavappCatalogItems: KavappCatalogItem[]) {
    const item = kavappCatalogItems.find(
        (catalogItem) => `${catalogItem.type}:${catalogItem.id}` === inventoryItem,
    );

    return item?.unitsName ?? item?.units ?? "";
}

export function findKavappCatalogItem(
    inventoryAlertRule: InventoryAlertRule,
    kavappCatalogItems: KavappCatalogItem[],
) {
    return kavappCatalogItems.find(
        (kavappCatalogItem) =>
            `${kavappCatalogItem.type}:${kavappCatalogItem.id}` === inventoryAlertRule.name,
    );
}

function createInventoryAlertRulePayload(
    inventoryAlertRule: InventoryAlertRule,
    kavappCatalogItem?: KavappCatalogItem,
): InventoryAlertRulePayload {
    if (kavappCatalogItem) {
        return {
            itemType: kavappCatalogItem.type,
            kavappItemId: kavappCatalogItem.id,
            name: kavappCatalogItem.name,
            unit: kavappCatalogItem.units,
            threshold: inventoryAlertRule.threshold,
            isIgnored: inventoryAlertRule.isIgnored,
            description: inventoryAlertRule.description,
        };
    }

    return {
        itemType: inventoryAlertRule.itemType,
        kavappItemId: inventoryAlertRule.kavappItemId,
        name: inventoryAlertRule.name,
        unit: inventoryAlertRule.unit,
        threshold: inventoryAlertRule.threshold,
        isIgnored: inventoryAlertRule.isIgnored,
        description: inventoryAlertRule.description,
    };
}
