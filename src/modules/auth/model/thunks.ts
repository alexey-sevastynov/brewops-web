import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { User } from "@/modules/auth/types/user";
import { createOne } from "@/shared/services/crud-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertToApiError } from "@/shared/lib/api-error";
import { AuthResponse } from "@/modules/auth/types/auth-response";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { setAuthCookies } from "@/shared/utils/cookie/auth-cookies";

type SignInDto = Pick<User, "email" | "password">;
type SignUpDto = Pick<User, "email" | "password" | "firstName" | "lastName" | "userName" | "phoneNumber">;

export const signIn = createAsyncThunk<AuthResponse, SignInDto, WithRejectValue>(
    "signIn",
    async (signInDto: SignInDto, { rejectWithValue }) => {
        try {
            const response = await createOne<SignInDto, AuthResponse>(apiEndpointNames.signIn, {
                email: signInDto.email,
                password: signInDto.password,
            });

            setAuthCookies(response.token, response.userName, !!response.isVerified, response.workspaceId);

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const signUp = createAsyncThunk<AuthResponse, SignUpDto, WithRejectValue>(
    "signUp",
    async (signUpDto: SignUpDto, { rejectWithValue }) => {
        try {
            const response = await createOne<SignUpDto, AuthResponse>(apiEndpointNames.signUp, {
                email: signUpDto.email,
                password: signUpDto.password,
                userName: signUpDto.userName,
                phoneNumber: undefined,
                firstName: undefined,
                lastName: undefined,
            });

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
