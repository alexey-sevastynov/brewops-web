import { EmployeeResourceTable } from "@/modules/employee/components/employee-resource-table/EmployeeResourceTable";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

export function Employees({ coffeeShopId }: WithCoffeeShopId) {
    return <EmployeeResourceTable coffeeShopId={coffeeShopId} />;
}
