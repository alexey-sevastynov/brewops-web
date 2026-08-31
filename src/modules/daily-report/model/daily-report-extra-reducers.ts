import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { DailyReportState } from "@/modules/daily-report/model/daily-report-slice";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import {
    createDailyReport,
    deleteDailyReport,
    getAllDailyReports,
    updateDailyReport,
} from "@/modules/daily-report/model/daily-report-thunks";
import { DailyReport } from "@/modules/daily-report/types/daily-report";

export const dailyReportExtraReducers = (builder: ActionReducerMapBuilder<DailyReportState>) => {
    builder
        .addCase(getAllDailyReports.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
        })
        .addCase(getAllDailyReports.fulfilled, (state, action: PayloadAction<DailyReport[]>) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(getAllDailyReports.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(createDailyReport.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(deleteDailyReport.fulfilled, (state, action) => {
            state.data = state.data.filter((report) => report._id !== action.meta.arg);
        })
        .addCase(updateDailyReport.fulfilled, (state, action) => {
            const index = state.data.findIndex((report) => report._id === action.payload._id);

            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
};
