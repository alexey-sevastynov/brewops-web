import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { createSlice } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { dailyReportExtraReducers } from "@/modules/daily-report/model/daily-report-extra-reducers";

export interface DailyReportState {
    data: DailyReport[];
    coffeeShopId: string | null;
    loading: boolean;
    error: ApiError | null;
}

const initialState: DailyReportState = {
    data: [],
    coffeeShopId: null,
    loading: false,
    error: null,
};

const dailyReportSlice = createSlice({
    name: "dailyReport",
    initialState,
    reducers: {},
    extraReducers: dailyReportExtraReducers,
});

export default dailyReportSlice.reducer;
