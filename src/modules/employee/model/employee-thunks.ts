import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { createOne, deleteOne, getAll, updateOne } from "@/shared/services/crud-service";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { Employee } from "@/modules/employee/types/employee";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

type CreateEmployeeDto = Omit<Employee, "_id">;

interface CreateEmployeePayload extends WithCoffeeShopId {
    employee: CreateEmployeeDto;
}

interface UpdateEmployeePayload extends WithCoffeeShopId {
    employee: Employee;
}

interface DeleteEmployeePayload extends WithCoffeeShopId {
    id: string;
}

export const getAllEmployees = createAsyncThunk<Employee[], string, { rejectValue: AxiosError }>(
    "allEmployees",
    async (coffeeShopId) => {
        const employees = await getAll<Employee>(apiEndpointNames.employees(coffeeShopId));

        return employees;
    },
);

export const createEmployee = createAsyncThunk<Employee, CreateEmployeePayload, WithRejectValue>(
    "createEmployee",
    async ({ coffeeShopId, employee }, { rejectWithValue }) => {
        try {
            const response = await createOne<CreateEmployeeDto, Employee>(
                apiEndpointNames.employees(coffeeShopId),
                employee,
            );

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const updateEmployee = createAsyncThunk<Employee, UpdateEmployeePayload, WithRejectValue>(
    "updateEmployee",
    async ({ coffeeShopId, employee }, { rejectWithValue }) => {
        try {
            const response = await updateOne<Employee, Employee>(
                apiEndpointNames.employees(coffeeShopId),
                employee._id,
                employee,
            );

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const deleteEmployee = createAsyncThunk<Employee, DeleteEmployeePayload, WithRejectValue>(
    "deleteEmployee",
    async ({ coffeeShopId, id }, { rejectWithValue }) => {
        try {
            const response = await deleteOne<Employee>(apiEndpointNames.employees(coffeeShopId), id);

            return response;
        } catch (error: unknown) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
