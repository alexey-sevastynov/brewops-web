import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/shared/lib/axios";
import { getWorkspaceCoffeeShopsEndpoint } from "@/shared/constants/api-endpoint-name";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";

type CoffeeShopInput = Pick<CoffeeShop, "name"> &
    Partial<Pick<CoffeeShop, "address" | "description" | "kavappEmail" | "kavappPassword" | "kavappPointId">>;

export const getCoffeeShops = createAsyncThunk<CoffeeShop[], string, WithRejectValue>(
    "coffeeShop/getCoffeeShops",
    async (workspaceId, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<CoffeeShop[]>(getWorkspaceCoffeeShopsEndpoint(workspaceId));
            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const createCoffeeShop = createAsyncThunk<
    CoffeeShop,
    { workspaceId: string; coffeeShop: CoffeeShopInput },
    WithRejectValue
>("coffeeShop/createCoffeeShop", async ({ workspaceId, coffeeShop }, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.post<CoffeeShop>(
            getWorkspaceCoffeeShopsEndpoint(workspaceId),
            coffeeShop,
        );
        return data;
    } catch (error) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateCoffeeShop = createAsyncThunk<
    CoffeeShop,
    { workspaceId: string; coffeeShop: CoffeeShop },
    WithRejectValue
>("coffeeShop/updateCoffeeShop", async ({ workspaceId, coffeeShop }, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.patch<CoffeeShop>(
            `${getWorkspaceCoffeeShopsEndpoint(workspaceId)}/${coffeeShop._id}`,
            coffeeShop,
        );
        return data;
    } catch (error) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const deleteCoffeeShop = createAsyncThunk<{ success: boolean; id: string }, string, WithRejectValue>(
    "coffeeShop/deleteCoffeeShop",
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`/coffee-shops/${id}`);
            return { success: true, id };
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
