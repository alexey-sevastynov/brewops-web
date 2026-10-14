import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/shared/lib/axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";

type CoffeeShopInput = Pick<CoffeeShop, "name"> &
    Partial<Pick<CoffeeShop, "address" | "description" | "kavappEmail" | "kavappPassword" | "kavappPointId">>;

export const getCoffeeShops = createAsyncThunk<CoffeeShop[], string, WithRejectValue>(
    "coffeeShop/getCoffeeShops",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<CoffeeShop[]>(apiEndpointNames.coffeeShops);

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
>("coffeeShop/createCoffeeShop", async ({ coffeeShop }, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.post<CoffeeShop>(apiEndpointNames.coffeeShops, coffeeShop);

        return data;
    } catch (error) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateCoffeeShop = createAsyncThunk<
    CoffeeShop,
    { workspaceId: string; coffeeShop: CoffeeShop },
    WithRejectValue
>("coffeeShop/updateCoffeeShop", async ({ coffeeShop }, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.patch<CoffeeShop>(
            `${apiEndpointNames.coffeeShops}/${coffeeShop._id}`,
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
            await apiClient.delete(`${apiEndpointNames.coffeeShops}/${id}`);

            return { success: true, id };
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
