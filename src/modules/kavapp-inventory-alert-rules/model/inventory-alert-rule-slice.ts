import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import {
    createInventoryAlertRule,
    deleteInventoryAlertRule,
    getAllInventoryAlertRules,
    updateInventoryAlertRule,
} from "@/modules/kavapp-inventory-alert-rules/model/inventory-alert-rule-thunks";

interface InventoryAlertRuleState {
    data: InventoryAlertRule[];
    loading: boolean;
    error: ApiError | null;
}

const initialState: InventoryAlertRuleState = { data: [], loading: false, error: null };

const inventoryAlertRuleSlice = createSlice({
    name: "inventoryAlertRules",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllInventoryAlertRules.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = [];
            })
            .addCase(
                getAllInventoryAlertRules.fulfilled,
                (state, action: PayloadAction<InventoryAlertRule[]>) => {
                    state.data = action.payload;
                    state.loading = false;
                },
            )
            .addCase(getAllInventoryAlertRules.rejected, (state, action) => {
                state.loading = false;
                const error = action.payload as ApiError | undefined;
                state.error = error ? createApiError(error.statusCode, error.message) : null;
            })
            .addCase(createInventoryAlertRule.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateInventoryAlertRule.fulfilled, (state, action) => {
                const index = state.data.findIndex(({ _id }) => _id === action.payload._id);

                if (index >= 0) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(deleteInventoryAlertRule.fulfilled, (state, action) => {
                state.data = state.data.filter(({ _id }) => _id !== action.meta.arg);
            });
    },
});

export default inventoryAlertRuleSlice.reducer;
