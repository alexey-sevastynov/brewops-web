import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";
import {
    createCoffeeShop,
    getCoffeeShops,
    updateCoffeeShop,
    deleteCoffeeShop,
} from "@/modules/coffee-shop/coffee-shop-thunks";
import { ApiError } from "@/shared/types/api-error/api-error-type";

export interface CoffeeShopState {
    coffeeShops: CoffeeShop[];
    selectedCoffeeShopId: string | null;
    requestedWorkspaceId: string | null;
    isLoading: boolean;
    error: ApiError | null;
}

const initialState: CoffeeShopState = {
    coffeeShops: [],
    selectedCoffeeShopId: null,
    requestedWorkspaceId: null,
    isLoading: false,
    error: null,
};

const coffeeShopSlice = createSlice({
    name: "coffeeShop",
    initialState,
    reducers: {
        setSelectedCoffeeShopId(state, action: PayloadAction<string | null>) {
            state.selectedCoffeeShopId = action.payload;
        },
        setCoffeeShops(state, action: PayloadAction<CoffeeShop[]>) {
            state.coffeeShops = action.payload;
        },
        resetCoffeeShopContext(state) {
            state.coffeeShops = [];
            state.selectedCoffeeShopId = null;
            state.requestedWorkspaceId = null;
            state.error = null;
        },
        clearCoffeeShopError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoffeeShops.pending, (state, action) => {
                state.requestedWorkspaceId = action.meta.arg;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCoffeeShops.fulfilled, (state, action) => {
                if (state.requestedWorkspaceId !== action.meta.arg) return;

                state.coffeeShops = action.payload;
                state.isLoading = false;

                if (!action.payload.some(({ _id }) => _id === state.selectedCoffeeShopId)) {
                    state.selectedCoffeeShopId = null;
                }
            })
            .addCase(getCoffeeShops.rejected, (state, action) => {
                if (state.requestedWorkspaceId !== action.meta.arg) return;

                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(createCoffeeShop.pending, (state) => {
                state.error = null;
            })
            .addCase(createCoffeeShop.fulfilled, (state, action) => {
                if (state.requestedWorkspaceId !== action.meta.arg.workspaceId) return;

                state.coffeeShops.push(action.payload);
                state.selectedCoffeeShopId = action.payload._id;
            })
            .addCase(createCoffeeShop.rejected, (state, action) => {
                if (state.requestedWorkspaceId !== action.meta.arg.workspaceId) return;

                state.error = action.payload ?? null;
            })
            .addCase(updateCoffeeShop.fulfilled, (state, action) => {
                if (state.requestedWorkspaceId !== action.meta.arg.workspaceId) return;

                const index = state.coffeeShops.findIndex(({ _id }) => _id === action.payload._id);

                if (index !== -1) state.coffeeShops[index] = action.payload;
            })
            .addCase(updateCoffeeShop.rejected, (state, action) => {
                if (state.requestedWorkspaceId !== action.meta.arg.workspaceId) return;

                state.error = action.payload ?? null;
            })
            .addCase(deleteCoffeeShop.fulfilled, (state, action) => {
                state.coffeeShops = state.coffeeShops.filter(({ _id }) => _id !== action.payload.id);

                if (state.selectedCoffeeShopId === action.payload.id) {
                    state.selectedCoffeeShopId = state.coffeeShops[0]?._id ?? null;
                }
            })
            .addCase(deleteCoffeeShop.rejected, (state, action) => {
                state.error = action.payload ?? null;
            });
    },
});

export const { setSelectedCoffeeShopId, setCoffeeShops, resetCoffeeShopContext, clearCoffeeShopError } =
    coffeeShopSlice.actions;

export default coffeeShopSlice.reducer;
