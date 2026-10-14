import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne } from "@/shared/services/crud-service";
import { setAuthCookies } from "@/shared/utils/cookie/auth-cookies";
import { convertToApiError } from "@/shared/lib/api-error";
import { User } from "@/modules/user/types/user";
import { AuthResponse } from "@/modules/auth/types/auth-response";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";

type SignInDto = Pick<User, "email" | "password">;
type SignUpDto = Pick<User, "email" | "password" | "firstName" | "lastName" | "userName" | "phoneNumber"> & {
    invitationToken?: string;
};

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
                phoneNumber: signUpDto.phoneNumber,
                firstName: signUpDto.firstName,
                lastName: signUpDto.lastName,
                invitationToken: signUpDto.invitationToken,
            });

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
