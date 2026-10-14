import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import {
    deleteUserAccount,
    getUserProfile,
    updateUserProfile,
} from "@/modules/user/model/user-thunks";
import { UserState } from "@/modules/user/model/user-slice";
import { signOut } from "@/modules/auth/model/slice";

export const userExtraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
    builder
        .addCase(getUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(deleteUserAccount.fulfilled, (state) => {
            state.profile = null;
        })
        .addCase(signOut, (state) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
        });
};
