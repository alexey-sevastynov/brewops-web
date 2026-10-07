import { createSlice } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { User } from "@/modules/user/types/user";
import { userExtraReducers } from "@/modules/user/model/user-extra-reducers";

export interface UserState {
    profile: User | null;
    loading: boolean;
    error: ApiError | null;
}

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserError(state) {
            state.error = null;
        },
    },
    extraReducers: userExtraReducers,
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
