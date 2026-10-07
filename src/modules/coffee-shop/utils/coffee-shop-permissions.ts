import { CoffeeShopResourcePermissions } from "@/modules/coffee-shop/types/сoffee-shop-resource-permissions";

export function canManageCoffeeShopResource(permissions: CoffeeShopResourcePermissions) {
    return permissions.canWrite || permissions.canDelete;
}
