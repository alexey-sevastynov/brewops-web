import { AxiosError } from "axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";

type CreateExpenseReportDto = Omit<ExpenseReport, "_id">;

interface CreateExpenseReportPayload {
    coffeeShopId: string;
    expenseReport: CreateExpenseReportDto;
}
interface UpdateExpenseReportPayload {
    coffeeShopId: string;
    expenseReport: ExpenseReport;
}
interface DeleteExpenseReportPayload {
    coffeeShopId: string;
    id: string;
}

export const getAllExpenseReports = createAsyncThunk<ExpenseReport[], string, { rejectValue: AxiosError }>(
    "allExpenseReport",
    async (coffeeShopId) => {
        const allExpenseReports = await getAll<ExpenseReport>(apiEndpointNames.expenseReports(coffeeShopId));

        return allExpenseReports;
    },
);

export const createExpenseReport = createAsyncThunk<
    ExpenseReport,
    CreateExpenseReportPayload,
    WithRejectValue
>("createExpenseReport", async ({ coffeeShopId, expenseReport }, { rejectWithValue }) => {
    try {
        const response = await createOne<CreateExpenseReportDto, ExpenseReport>(
            apiEndpointNames.expenseReports(coffeeShopId),
            expenseReport,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const deleteExpenseReport = createAsyncThunk<
    ExpenseReport,
    DeleteExpenseReportPayload,
    WithRejectValue
>("deleteExpenseReport", async ({ coffeeShopId, id }, { rejectWithValue }) => {
    try {
        const response = await deleteOne<ExpenseReport>(apiEndpointNames.expenseReports(coffeeShopId), id);

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const updateExpenseReport = createAsyncThunk<
    ExpenseReport,
    UpdateExpenseReportPayload,
    WithRejectValue
>("updateExpenseReport", async ({ coffeeShopId, expenseReport }, { rejectWithValue }) => {
    try {
        const response = await updateOne<ExpenseReport>(
            apiEndpointNames.expenseReports(coffeeShopId),
            expenseReport._id,
            expenseReport,
        );

        return response;
    } catch (error: unknown) {
        return rejectWithValue(convertToApiError(error));
    }
});
