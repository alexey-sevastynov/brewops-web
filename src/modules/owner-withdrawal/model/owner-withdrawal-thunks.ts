import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { OwnerWithdrawal } from "@/modules/owner-withdrawal/types/owner-withdrawal";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

type CreateOwnerWithdrawalDto = Omit<OwnerWithdrawal, "_id">;

interface CreateOwnerWithdrawalPayload extends WithCoffeeShopId {
    withdrawal: CreateOwnerWithdrawalDto;
}

interface UpdateOwnerWithdrawalPayload extends WithCoffeeShopId {
    withdrawal: OwnerWithdrawal;
}

interface DeleteOwnerWithdrawalPayload extends WithCoffeeShopId {
    id: string;
}

export const getAllOwnerWithdrawals = createAsyncThunk<
    OwnerWithdrawal[],
    string,
    { rejectValue: AxiosError }
>("allOwnerWithdrawals", async (coffeeShopId) => {
    const withdrawals = await getAll<OwnerWithdrawal>(apiEndpointNames.ownerWithdrawals(coffeeShopId));

    return withdrawals;
});

export const createOwnerWithdrawal = createAsyncThunk<
    OwnerWithdrawal,
    CreateOwnerWithdrawalPayload,
    WithRejectValue
>("createOwnerWithdrawal", async ({ coffeeShopId, withdrawal }, { rejectWithValue }) => {
    try {
        const response = await createOne<CreateOwnerWithdrawalDto, OwnerWithdrawal>(
            apiEndpointNames.ownerWithdrawals(coffeeShopId),
            withdrawal,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateOwnerWithdrawal = createAsyncThunk<
    OwnerWithdrawal,
    UpdateOwnerWithdrawalPayload,
    WithRejectValue
>("updateOwnerWithdrawal", async ({ coffeeShopId, withdrawal }, { rejectWithValue }) => {
    try {
        const response = await updateOne<OwnerWithdrawal, OwnerWithdrawal>(
            apiEndpointNames.ownerWithdrawals(coffeeShopId),
            withdrawal._id,
            withdrawal,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const deleteOwnerWithdrawal = createAsyncThunk<
    OwnerWithdrawal,
    DeleteOwnerWithdrawalPayload,
    WithRejectValue
>("deleteOwnerWithdrawal", async ({ coffeeShopId, id }, { rejectWithValue }) => {
    try {
        const response = await deleteOne<OwnerWithdrawal>(
            apiEndpointNames.ownerWithdrawals(coffeeShopId),
            id,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});
