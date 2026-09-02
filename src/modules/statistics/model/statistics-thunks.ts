import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { CoffeeShopStatistics } from "@/modules/statistics/types/statistic-coffee-shop";
import { apiClient } from "@/shared/lib/axios";
import { DateRange } from "@/shared/types/date-range/date-range-type";
import { formatDateToIsoDate } from "@/shared/utils/date";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

interface GetCoffeeShopStatisticsPayload extends WithCoffeeShopId {
    dateRange: DateRange;
}

export const getCoffeeShopStatistics = createAsyncThunk<
    CoffeeShopStatistics,
    GetCoffeeShopStatisticsPayload,
    { rejectValue: AxiosError }
>("allCoffeeShopStatistics", async ({ coffeeShopId, dateRange }) => {
    const response = await apiClient.get<CoffeeShopStatistics>(apiEndpointNames.statistics(coffeeShopId), {
        params: {
            from: formatDateToIsoDate(dateRange.from),
            to: formatDateToIsoDate(dateRange.to),
        },
    });

    const coffeeShopStatistics = response.data;

    return coffeeShopStatistics;
});
