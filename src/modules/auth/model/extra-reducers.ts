import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import { AuthResponse } from "@/modules/auth/types/auth-response";
import { signIn, signUp } from "@/modules/auth/model/thunks";
import { AuthState } from "@/modules/auth/model/slice";

export const authExtraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(signIn.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(signIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isSignedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.workspaceId = action.payload.workspaceId ?? null;
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })

        .addCase(signUp.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(signUp.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.isSignedIn = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.userName = action.payload.userName;
            state.workspaceId = action.payload.workspaceId ?? null;
        })
        .addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        });
};
