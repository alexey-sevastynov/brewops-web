import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { InventoryAuditResourceTable } from "@/modules/inventory-audit/components/inventory-audit-resource-table/InventoryAuditResourceTable";

export function InventoryAudit({ coffeeShopId }: WithCoffeeShopId) {
    return <InventoryAuditResourceTable coffeeShopId={coffeeShopId} />;
}
