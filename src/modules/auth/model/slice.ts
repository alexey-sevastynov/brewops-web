import { createSlice } from "@reduxjs/toolkit";
import { authExtraReducers } from "@/modules/auth/model/extra-reducers";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { clearAuthCookies } from "@/shared/utils/cookie/auth-cookies";

export interface AuthState {
    userId: string | null;
    userName: string | null;
    token: string | null;
    workspaceId: string | null;
    isLoading: boolean;
    error: ApiError | null;
    isSignedIn: boolean;
}

const initialState: AuthState = {
    userId: null,
    userName: null,
    token: null,
    workspaceId: null,
    isLoading: false,
    error: null,
    isSignedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state) => {
            clearAuthCookies();

            state.userId = null;
            state.userName = null;
            state.token = null;
            state.workspaceId = null;
            state.isSignedIn = false;
            state.isLoading = false;
            state.error = null;
        },
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: authExtraReducers,
});

export const { signOut, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
