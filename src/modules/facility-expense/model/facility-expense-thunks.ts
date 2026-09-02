import { AxiosError } from "axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";

type CreateFacilityExpenseDto = Omit<FacilityExpense, "_id">;

interface CreateFacilityExpensePayload {
    coffeeShopId: string;
    expense: CreateFacilityExpenseDto;
}

interface UpdateFacilityExpensePayload {
    coffeeShopId: string;
    expense: FacilityExpense;
}

interface DeleteFacilityExpensePayload {
    coffeeShopId: string;
    id: string;
}

export const getAllFacilityExpenses = createAsyncThunk<
    FacilityExpense[],
    string,
    { rejectValue: AxiosError }
>("allFacilityExpenses", async (coffeeShopId) => {
    const allExpenses = await getAll<FacilityExpense>(apiEndpointNames.facilityExpenses(coffeeShopId));

    return allExpenses;
});

export const createFacilityExpense = createAsyncThunk<
    FacilityExpense,
    CreateFacilityExpensePayload,
    WithRejectValue
>("createFacilityExpense", async ({ coffeeShopId, expense }, { rejectWithValue }) => {
    try {
        const response = await createOne<CreateFacilityExpenseDto, FacilityExpense>(
            apiEndpointNames.facilityExpenses(coffeeShopId),
            expense,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const deleteFacilityExpense = createAsyncThunk<
    FacilityExpense,
    DeleteFacilityExpensePayload,
    WithRejectValue
>("deleteFacilityExpense", async ({ coffeeShopId, id }, { rejectWithValue }) => {
    try {
        const response = await deleteOne<FacilityExpense>(
            apiEndpointNames.facilityExpenses(coffeeShopId),
            id,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateFacilityExpense = createAsyncThunk<
    FacilityExpense,
    UpdateFacilityExpensePayload,
    WithRejectValue
>("updateFacilityExpense", async ({ coffeeShopId, expense }, { rejectWithValue }) => {
    try {
        const response = await updateOne<FacilityExpense>(
            apiEndpointNames.facilityExpenses(coffeeShopId),
            expense._id,
            expense,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});
