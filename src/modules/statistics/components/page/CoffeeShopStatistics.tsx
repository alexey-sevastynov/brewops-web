"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { RangeDatePicker } from "@/shared/ui/date-picker/RangeDatePicker";
import { DateRange } from "@/shared/types/date-range/date-range-type";
import { initializeDateRangeFromDailyReports } from "@/modules/statistics/components/page/coffeeShopStatistics.funcs";
import { LoadingIndicator } from "@/shared/ui/loading-indicator/LoadingIndicator";
import { textPositions } from "@/shared/ui/typography/text-position";
import { Title } from "@/shared/ui/typography/title/Title";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { getAllEmployees } from "@/modules/employee/model/employee-thunks";
import { getCoffeeShopStatistics } from "@/modules/statistics/model/statistics-thunks";
import { getAllDailyReports } from "@/modules/daily-report/model/daily-report-thunks";
import { StatisticsDashboard } from "@/modules/statistics/components/page/statistics-dashboard/StatisticsDashboard";

export function CoffeeShopStatistics({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const dailyReports = useAppSelector((state) => state.dailyReport.data);
    const dailyReportLoading = useAppSelector((state) => state.dailyReport.loading);
    const statisticsData = useAppSelector((state) => state.statistics.data);
    const statisticsLoading = useAppSelector((state) => state.statistics.loading);

    const [dateRange, setDateRange] = useState<DateRange>({});
    const [isAutoInitialized, setIsAutoInitialized] = useState(false);

    useEffect(() => {
        dispatch(getAllEmployees(coffeeShopId));
        dispatch(getAllDailyReports(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    useEffect(() => {
        if (isAutoInitialized) return;

        if (!initializeDateRangeFromDailyReports(dailyReports, dailyReportLoading, setDateRange)) return;

        // TODO: temporary workaround — avoid setState inside effect warning; refactor initialization logic

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAutoInitialized(true);
    }, [isAutoInitialized, dailyReports, dailyReportLoading]);

    useEffect(() => {
        if (dateRange.from && dateRange.to) {
            dispatch(
                getCoffeeShopStatistics({
                    coffeeShopId,
                    dateRange,
                }),
            );
        }
    }, [dateRange, coffeeShopId, dispatch]);

    const isInitialLoading = dailyReportLoading || (!isAutoInitialized && !dailyReports.length);
    const highlightDates = dailyReports.map((report) => new Date(report.date));

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border p-4 shadow-sm">
                <Title textPosition={textPositions.left}>Статистика кав&apos;ярні</Title>

                {isInitialLoading ? (
                    <LoadingIndicator text="Завантаження звітів..." />
                ) : (
                    <RangeDatePicker
                        value={dateRange}
                        onChange={setDateRange}
                        highlightDates={highlightDates}
                        className="max-w-sm"
                    />
                )}
            </div>

            {statisticsLoading && <LoadingIndicator text="Завантаження статистики..." className="px-1" />}

            {statisticsData && !statisticsLoading && <StatisticsDashboard statisticsData={statisticsData} />}
        </div>
    );
}
