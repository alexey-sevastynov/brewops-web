import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

type CreateInventoryAuditDto = Omit<InventoryAudit, "_id">;

interface CreateInventoryAuditPayload extends WithCoffeeShopId {
    inventoryAudit: CreateInventoryAuditDto;
}

interface UpdateInventoryAuditPayload extends WithCoffeeShopId {
    inventoryAudit: InventoryAudit;
}

interface DeleteInventoryAuditPayload extends WithCoffeeShopId {
    id: string;
}

export const getAllInventoryAudits = createAsyncThunk<InventoryAudit[], string, { rejectValue: AxiosError }>(
    "allInventoryAudits",
    async (coffeeShopId) => {
        const inventoryAudits = await getAll<InventoryAudit>(apiEndpointNames.inventoryAudits(coffeeShopId));

        return inventoryAudits;
    },
);

export const createInventoryAudit = createAsyncThunk<
    InventoryAudit,
    CreateInventoryAuditPayload,
    WithRejectValue
>("createInventoryAudit", async ({ coffeeShopId, inventoryAudit }, { rejectWithValue }) => {
    try {
        const response = await createOne<CreateInventoryAuditDto, InventoryAudit>(
            apiEndpointNames.inventoryAudits(coffeeShopId),
            inventoryAudit,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateInventoryAudit = createAsyncThunk<
    InventoryAudit,
    UpdateInventoryAuditPayload,
    WithRejectValue
>("updateInventoryAudit", async ({ coffeeShopId, inventoryAudit }, { rejectWithValue }) => {
    try {
        const response = await updateOne<InventoryAudit, InventoryAudit>(
            apiEndpointNames.inventoryAudits(coffeeShopId),
            inventoryAudit._id,
            inventoryAudit,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const deleteInventoryAudit = createAsyncThunk<
    InventoryAudit,
    DeleteInventoryAuditPayload,
    WithRejectValue
>("deleteInventoryAudit", async ({ coffeeShopId, id }, { rejectWithValue }) => {
    try {
        const response = await deleteOne<InventoryAudit>(apiEndpointNames.inventoryAudits(coffeeShopId), id);

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});
