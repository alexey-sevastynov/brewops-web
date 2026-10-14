import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { FacilityExpenseResourceTable } from "@/modules/facility-expense/components/facility-expense-resource-table/FacilityExpenseResourceTable";

export function FacilityExpense({ coffeeShopId }: WithCoffeeShopId) {
    return <FacilityExpenseResourceTable coffeeShopId={coffeeShopId} />;
}
