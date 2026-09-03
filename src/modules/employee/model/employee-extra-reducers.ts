import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { EmployeeState } from "@/modules/employee/model/employee-slice";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { createApiError } from "@/shared/lib/api-error";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    updateEmployee,
} from "@/modules/employee/model/employee-thunks";

export const employeeExtraReducers = (builder: ActionReducerMapBuilder<EmployeeState>) => {
    builder
        .addCase(getAllEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
        })
        .addCase(getAllEmployees.fulfilled, (state, action) => {
            state.data = action.payload;
            state.coffeeShopId = action.meta.arg;
            state.loading = false;
        })
        .addCase(getAllEmployees.rejected, (state, action) => {
            state.loading = false;
            state.coffeeShopId = action.meta.arg;
            const error = action.payload as ApiError | undefined;
            state.error = error ? createApiError(error.statusCode, error.message) : null;
        })
        .addCase(createEmployee.fulfilled, (state, action) => {
            state.data.push(action.payload);
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
            state.data = state.data.filter((emp) => emp._id !== action.meta.arg.id);
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            const index = state.data.findIndex((emp) => emp._id === action.payload._id);

            if (index !== -1) {
                state.data[index] = action.payload;
            }
        });
};
