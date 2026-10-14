import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import {
    createExpenseReport,
    deleteExpenseReport,
    getAllExpenseReports,
    updateExpenseReport,
} from "@/modules/expense-report/model/expense-report-thunks";
import { ExpenseReportState } from "@/modules/expense-report/model/expense-report-slice";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";

export const expenseReportExtraReducers = (builder: ActionReducerMapBuilder<ExpenseReportState>) => {
    builder
        .addCase(getAllExpenseReports.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
        })
        .addCase(getAllExpenseReports.fulfilled, (state, action: PayloadAction<ExpenseReport[]>) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(getAllExpenseReports.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(createExpenseReport.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(deleteExpenseReport.fulfilled, (state, action) => {
            state.data = state.data.filter((report) => report._id !== action.meta.arg.id);
        })
        .addCase(updateExpenseReport.fulfilled, (state, action) => {
            const index = state.data.findIndex((report) => report._id === action.payload._id);

            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
};
