import { FinancialResultSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/FinancialResultSection";
import { GeneralStatisticsSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/GeneralStatisticsSection";
import { RevenueSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/RevenueSection";
import { ExpensesSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/ExpensesSection";
import { ExpensesBreakdownSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/ExpensesBreakdownSection";
import { InventoryAuditSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/InventoryAuditSection";
import { OwnerWithdrawalsSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/OwnerWithdrawalsSection";
import { TeamStatisticsSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/team-statistics-section/TeamStatisticsSection";
import { PercentagesSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/PercentagesSection";
import { CoffeeShopStatistics } from "@/modules/statistics/types/statistic-coffee-shop";
import { FinancialMetricsSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/FinancialThresholdSection";
import { FacilityExpenseSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/FacilityExpenseSection";
import { HighlightsSection } from "@/modules/statistics/components/page/statistics-dashboard/sections/highlights-section/HighlightsSection";

interface StatisticsDashboardProps {
    statisticsData: CoffeeShopStatistics;
}

export function StatisticsDashboard({ statisticsData }: StatisticsDashboardProps) {
    return (
        <div className="flex flex-col gap-6">
            <FinancialResultSection
                netProfit={statisticsData.netProfit}
                netProfitAfterExpenses={statisticsData.netProfitAfterExpenses}
            />
            <GeneralStatisticsSection
                totalDays={statisticsData.totalDays}
                totalShifts={statisticsData.totalShifts}
            />
            <RevenueSection
                totalRevenue={statisticsData.totalRevenue}
                cashRevenue={statisticsData.cashRevenue}
                terminalRevenue={statisticsData.terminalRevenue}
            />
            <ExpensesSection
                costOfGoods={statisticsData.costOfGoods}
                productWriteOffs={statisticsData.productWriteOffs}
                acquiringFee={statisticsData.acquiringFee}
                totalExpenses={statisticsData.totalExpenses}
            />
            <ExpensesBreakdownSection breakdown={statisticsData.expensesBreakdown} />
            <InventoryAuditSection inventoryAuditTotals={statisticsData.inventoryAuditTotals} />
            <OwnerWithdrawalsSection summary={statisticsData.ownerWithdrawals} />
            <FacilityExpenseSection facilityExpenseSummary={statisticsData.facilityExpense} />
            <HighlightsSection highlights={statisticsData.highlights} />
            <TeamStatisticsSection employees={statisticsData.employees} />
            <PercentagesSection percentages={statisticsData.percentages} />
            <FinancialMetricsSection percentages={statisticsData.percentages} />
        </div>
    );
}
