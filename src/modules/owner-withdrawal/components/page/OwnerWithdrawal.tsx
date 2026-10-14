import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { OwnerWithdrawalResourceTable } from "@/modules/owner-withdrawal/components/owner-withdrawal-resource-table/OwnerWithdrawalResourceTable";

export function OwnerWithdrawal({ coffeeShopId }: WithCoffeeShopId) {
    return <OwnerWithdrawalResourceTable coffeeShopId={coffeeShopId} />;
}
