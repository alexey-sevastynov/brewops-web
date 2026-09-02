import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

type CreateDailyReportDto = Omit<DailyReport, "_id">;

interface CreateDailyReportPayload extends WithCoffeeShopId {
    dailyReport: CreateDailyReportDto;
}

interface UpdateDailyReportPayload extends WithCoffeeShopId {
    dailyReport: DailyReport;
}

interface DeleteDailyReportPayload extends WithCoffeeShopId {
    id: string;
}

export const getAllDailyReports = createAsyncThunk<DailyReport[], string, { rejectValue: AxiosError }>(
    "allDailyReports",
    async (coffeeShopId) => {
        const allDailyReports = await getAll<DailyReport>(apiEndpointNames.dailyReports(coffeeShopId));

        return allDailyReports;
    },
);

export const createDailyReport = createAsyncThunk<DailyReport, CreateDailyReportPayload, WithRejectValue>(
    "createDailyReport",
    async ({ coffeeShopId, dailyReport }, { rejectWithValue }) => {
        try {
            const response = await createOne<CreateDailyReportDto, DailyReport>(
                apiEndpointNames.dailyReports(coffeeShopId),
                dailyReport,
            );

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const updateDailyReport = createAsyncThunk<DailyReport, UpdateDailyReportPayload, WithRejectValue>(
    "updateDailyReport",
    async ({ coffeeShopId, dailyReport }, { rejectWithValue }) => {
        try {
            const response = await updateOne<DailyReport, DailyReport>(
                apiEndpointNames.dailyReports(coffeeShopId),
                dailyReport._id,
                dailyReport,
            );

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const deleteDailyReport = createAsyncThunk<DailyReport, DeleteDailyReportPayload, WithRejectValue>(
    "deleteDailyReport",
    async ({ coffeeShopId, id }, { rejectWithValue }) => {
        try {
            const response = await deleteOne<DailyReport>(apiEndpointNames.dailyReports(coffeeShopId), id);
            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
