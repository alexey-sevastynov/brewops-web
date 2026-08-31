import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import {
    createFacilityExpense,
    deleteFacilityExpense,
    getAllFacilityExpenses,
    updateFacilityExpense,
} from "@/modules/facility-expense/model/facility-expense-thunks";
import { FacilityExpenseState } from "@/modules/facility-expense/model/facility-expense-slice";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";

export const facilityExpenseExtraReducers = (builder: ActionReducerMapBuilder<FacilityExpenseState>) => {
    builder
        .addCase(getAllFacilityExpenses.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
        })
        .addCase(getAllFacilityExpenses.fulfilled, (state, action: PayloadAction<FacilityExpense[]>) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(getAllFacilityExpenses.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(createFacilityExpense.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(deleteFacilityExpense.fulfilled, (state, action) => {
            state.data = state.data.filter((expense) => expense._id !== action.meta.arg);
        })
        .addCase(updateFacilityExpense.fulfilled, (state, action) => {
            const index = state.data.findIndex((expense) => expense._id === action.payload._id);

            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
};
