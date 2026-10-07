import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/shared/lib/axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { User } from "@/modules/user/types/user";

export interface UpdateUserProfilePayload {
    userName: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
}

export const getUserProfile = createAsyncThunk<User, void, WithRejectValue>(
    "user/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<User>(apiEndpointNames.usersMe);

            return data;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const updateUserProfile = createAsyncThunk<User, UpdateUserProfilePayload, WithRejectValue>(
    "user/updateProfile",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.patch<User>(apiEndpointNames.usersMe, payload);

            return data;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const deleteUserAccount = createAsyncThunk<{ success: boolean; message?: string }, void, WithRejectValue>(
    "user/deleteAccount",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.delete<{ success: boolean; message?: string }>(apiEndpointNames.usersMe);

            return data;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
