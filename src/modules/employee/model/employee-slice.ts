import { Employee } from "@/modules/employee/types/employee";
import { createSlice } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { employeeExtraReducers } from "@/modules/employee/model/employee-extra-reducers";

export interface EmployeeState {
    data: Employee[];
    coffeeShopId: string | null;
    loading: boolean;
    error: ApiError | null;
}

const initialState: EmployeeState = {
    data: [],
    coffeeShopId: null,
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: employeeExtraReducers,
});

export default employeeSlice.reducer;
