import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import {
    KavappInventoryResponse,
    KavappInventorySnapshot,
} from "@/modules/kavapp-inventory/types/kavapp-inventory-response";
import {
    fetchKavappInventory,
    syncKavappInventory as syncKavappInventoryApi,
    fetchLatestKavappSnapshot,
} from "@/modules/kavapp-inventory/services/kavapp-inventory-api";

export const getAllKavappInventory = createAsyncThunk<
    KavappInventoryResponse,
    { coffeeShopId: string; pointId?: string },
    { rejectValue: AxiosError }
>("kavappInventory/getAll", async ({ coffeeShopId, pointId }) => {
    return fetchKavappInventory(coffeeShopId, pointId);
});

export const syncKavappInventory = createAsyncThunk<
    unknown,
    { coffeeShopId: string; pointId?: string; testAlert?: boolean },
    WithRejectValue
>("kavappInventory/sync", async ({ coffeeShopId, pointId, testAlert }, { rejectWithValue }) => {
    try {
        return syncKavappInventoryApi(coffeeShopId, pointId, testAlert);
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const getLatestKavappSnapshot = createAsyncThunk<
    KavappInventorySnapshot,
    { coffeeShopId: string },
    { rejectValue: AxiosError }
>("kavappInventory/getLatestSnapshot", async ({ coffeeShopId }) => {
    return fetchLatestKavappSnapshot(coffeeShopId);
});
