import { DailyReportResourceTable } from "@/modules/daily-report/components/daily-report-resource-table/DailyReportResourceTable";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

export function DailyReports({ coffeeShopId }: WithCoffeeShopId) {
    return <DailyReportResourceTable coffeeShopId={coffeeShopId} />;
}
