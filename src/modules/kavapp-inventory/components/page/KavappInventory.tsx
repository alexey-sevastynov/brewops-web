import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { KavappInventoryTable } from "@/modules/kavapp-inventory/components/kavapp-inventory-table/KavappInventoryTable";

export function KavappInventory({ coffeeShopId }: WithCoffeeShopId) {
    return <KavappInventoryTable coffeeShopId={coffeeShopId} />;
}
