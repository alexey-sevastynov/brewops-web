import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { ResourceField } from "@/shared/types/resource-field";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { coffeeShopProps } from "@/modules/coffee-shop/constants/coffee-shop-props";
import { coffeeShopLabels } from "@/modules/coffee-shop/constants/coffee-shop-labels";
import { worspacePlanNames } from "@/modules/workspace/constants/workspace-plan-names";

export function getCoffeeShopFormFields(isFreePlan = false): ResourceField<CoffeeShop>[] {
    const proNotice = isFreePlan ? ` (${worspacePlanNames.pro})` : "";
    const proPlaceholder = isFreePlan
        ? `Доступно на тарифі ${worspacePlanNames.pro} / ${worspacePlanNames.business}`
        : undefined;

    return [
        {
            name: coffeeShopProps.name as keyof CoffeeShop,
            label: coffeeShopLabels.name,
            type: resourceFieldTypes.text,
            required: true,
        },
        {
            name: coffeeShopProps.address as keyof CoffeeShop,
            label: coffeeShopLabels.address,
            type: resourceFieldTypes.text,
        },
        {
            name: coffeeShopProps.description as keyof CoffeeShop,
            label: coffeeShopLabels.description,
            type: resourceFieldTypes.text,
        },
        {
            name: coffeeShopProps.telegramChatId as keyof CoffeeShop,
            label: `${coffeeShopLabels.telegramChatId}${proNotice}`,
            type: resourceFieldTypes.text,
            disabled: isFreePlan,
            placeholder: proPlaceholder ?? "Наприклад, -1001234567890",
        },
        {
            name: coffeeShopProps.kavappEmail as keyof CoffeeShop,
            label: `${coffeeShopLabels.kavappEmail}${proNotice}`,
            type: resourceFieldTypes.text,
            disabled: isFreePlan,
            placeholder: proPlaceholder ?? "email@example.com",
        },
        {
            name: coffeeShopProps.kavappPassword as keyof CoffeeShop,
            label: `${coffeeShopLabels.kavappPassword}${proNotice}`,
            type: resourceFieldTypes.password,
            disabled: isFreePlan,
            placeholder: proPlaceholder ?? "••••••••",
        },
        {
            name: coffeeShopProps.kavappPointId as keyof CoffeeShop,
            label: `${coffeeShopLabels.kavappPointId}${proNotice}`,
            type: resourceFieldTypes.text,
            disabled: isFreePlan,
            placeholder: proPlaceholder ?? "Наприклад, 123",
        },
    ];
}

export const coffeeShopFormFields = getCoffeeShopFormFields();
