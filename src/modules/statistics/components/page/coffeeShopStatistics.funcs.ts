import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { DateRange } from "@/shared/types/date-range/date-range-type";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { isNonEmptyArray } from "@/shared/utils/array";

export function initializeDateRangeFromDailyReports(
    dailyReports: DailyReport[],
    loading: boolean,
    setDateRange: VoidFunc<DateRange>,
) {
    if (!isDailyReportsReady(dailyReports, loading)) return false;

    const lastReportDate = getLastReportDate(dailyReports.map((dailyReport) => dailyReport.date));

    if (!lastReportDate) return false;

    setDateRange({ from: lastReportDate, to: lastReportDate });

    return true;
}

function getLastReportDate(dates: string[]) {
    if (!dates.length) return undefined;

    const sorted = [...dates].sort();
    const lastStr = sorted[sorted.length - 1];
    const parsed = new Date(lastStr);

    return isNaN(parsed.getTime()) ? undefined : parsed;
}

function isDailyReportsReady(dailyReports: DailyReport[], loading: boolean) {
    return !loading && isNonEmptyArray(dailyReports);
}
