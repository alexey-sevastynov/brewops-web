import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import {
    InventoryAlertRule,
    InventoryAlertRulePayload,
} from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

interface InventoryAlertRulePayloadWithCoffeeShopId extends WithCoffeeShopId {
    payload: InventoryAlertRulePayload;
}

export const getAllInventoryAlertRules = createAsyncThunk<
    InventoryAlertRule[],
    string,
    { rejectValue: AxiosError }
>("inventoryAlertRules/getAll", (coffeeShopId) =>
    getAll<InventoryAlertRule>(apiEndpointNames.kavappInventoryAlertRules(coffeeShopId)),
);

export const createInventoryAlertRule = createAsyncThunk<
    InventoryAlertRule,
    InventoryAlertRulePayloadWithCoffeeShopId,
    WithRejectValue
>("inventoryAlertRules/create", async ({ coffeeShopId, payload }, { rejectWithValue }) => {
    try {
        return await createOne<InventoryAlertRulePayload, InventoryAlertRule>(
            apiEndpointNames.kavappInventoryAlertRules(coffeeShopId),
            payload,
        );
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateInventoryAlertRule = createAsyncThunk<
    InventoryAlertRule,
    InventoryAlertRulePayloadWithCoffeeShopId & { id: string },
    WithRejectValue
>("inventoryAlertRules/update", async ({ coffeeShopId, id, payload }, { rejectWithValue }) => {
    try {
        return await updateOne<InventoryAlertRulePayload, InventoryAlertRule>(
            apiEndpointNames.kavappInventoryAlertRules(coffeeShopId),
            id,
            payload,
        );
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const deleteInventoryAlertRule = createAsyncThunk<
    void,
    WithCoffeeShopId & { id: string },
    WithRejectValue
>("inventoryAlertRules/delete", async ({ coffeeShopId, id }, { rejectWithValue }) => {
    try {
        await deleteOne<{ success: boolean }>(apiEndpointNames.kavappInventoryAlertRules(coffeeShopId), id);
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});
