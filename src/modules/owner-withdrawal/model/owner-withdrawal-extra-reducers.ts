import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import { OwnerWithdrawalState } from "@/modules/owner-withdrawal/model/owner-withdrawal-slice";
import {
    createOwnerWithdrawal,
    deleteOwnerWithdrawal,
    getAllOwnerWithdrawals,
    updateOwnerWithdrawal,
} from "@/modules/owner-withdrawal/model/owner-withdrawal-thunks";
import { OwnerWithdrawal } from "@/modules/owner-withdrawal/types/owner-withdrawal";

export const ownerWithdrawalExtraReducers = (builder: ActionReducerMapBuilder<OwnerWithdrawalState>) => {
    builder
        .addCase(getAllOwnerWithdrawals.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
        })
        .addCase(getAllOwnerWithdrawals.fulfilled, (state, action: PayloadAction<OwnerWithdrawal[]>) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(getAllOwnerWithdrawals.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(createOwnerWithdrawal.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(deleteOwnerWithdrawal.fulfilled, (state, action) => {
            state.data = state.data.filter((withdrawal) => withdrawal._id !== action.meta.arg.id);
        })
        .addCase(updateOwnerWithdrawal.fulfilled, (state, action) => {
            const index = state.data.findIndex((withdrawal) => withdrawal._id === action.payload._id);

            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
};
