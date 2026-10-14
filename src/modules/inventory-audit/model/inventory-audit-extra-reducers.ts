import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import { InventoryAuditState } from "@/modules/inventory-audit/model/inventory-audit-slice";
import {
    createInventoryAudit,
    deleteInventoryAudit,
    getAllInventoryAudits,
    updateInventoryAudit,
} from "@/modules/inventory-audit/model/inventory-audit-thunks";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";

export const inventoryAuditExtraReducers = (builder: ActionReducerMapBuilder<InventoryAuditState>) => {
    builder
        .addCase(getAllInventoryAudits.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
        })
        .addCase(getAllInventoryAudits.fulfilled, (state, action: PayloadAction<InventoryAudit[]>) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(getAllInventoryAudits.rejected, (state, action) => {
            state.loading = false;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(createInventoryAudit.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(deleteInventoryAudit.fulfilled, (state, action) => {
            state.data = state.data.filter((audit) => audit._id !== action.meta.arg.id);
        })
        .addCase(updateInventoryAudit.fulfilled, (state, action) => {
            const index = state.data.findIndex((audit) => audit._id === action.payload._id);

            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
};
