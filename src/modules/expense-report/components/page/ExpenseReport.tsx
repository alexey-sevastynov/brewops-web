import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { ExpenseReportResourceTable } from "@/modules/expense-report/components/expense-report-resource-table/ExpenseReportResourceTable";

export function ExpenseReport({ coffeeShopId }: WithCoffeeShopId) {
    return <ExpenseReportResourceTable coffeeShopId={coffeeShopId} />;
}
