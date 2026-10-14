import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { KavappInventoryState } from "@/modules/kavapp-inventory/model/kavapp-inventory-slice";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import {
    getAllKavappInventory,
    getLatestKavappSnapshot,
    syncKavappInventory,
} from "@/modules/kavapp-inventory/model/kavapp-inventory-thunks";
import { KavappInventoryResponse, KavappInventorySnapshot } from "@/modules/kavapp-inventory/types/kavapp-inventory-response";

export const kavappInventoryExtraReducers = (builder: ActionReducerMapBuilder<KavappInventoryState>) => {
    builder
        .addCase(getAllKavappInventory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.inventory = null;
        })
        .addCase(getAllKavappInventory.fulfilled, (state, action: PayloadAction<KavappInventoryResponse>) => {
            state.inventory = action.payload;
            state.loading = false;
        })
        .addCase(getAllKavappInventory.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(syncKavappInventory.pending, (state) => {
            state.syncing = true;
        })
        .addCase(syncKavappInventory.fulfilled, (state) => {
            state.syncing = false;
        })
        .addCase(syncKavappInventory.rejected, (state) => {
            state.syncing = false;
        })
        .addCase(getLatestKavappSnapshot.fulfilled, (state, action: PayloadAction<KavappInventorySnapshot>) => {
            state.latestSnapshot = action.payload;
        });
};
