"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { getTodayDate } from "@/shared/utils/date";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Employee } from "@/modules/employee/types/employee";
import { createEmployeeActionsColumn } from "@/modules/employee/configs/employee-actions";
import { employeeColumns } from "@/modules/employee/configs/employee-columns";
import { employeeFormFields } from "@/modules/employee/configs/employee-form-fields";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    updateEmployee,
} from "@/modules/employee/model/employee-thunks";

export function EmployeeResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state) => state.employee.data);
    const isLoadingEmployees = useAppSelector((state) => state.employee.loading);

    useEffect(() => {
        dispatch(getAllEmployees(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<Employee>
            title="Список працівників"
            data={employees}
            isLoading={isLoadingEmployees}
            columns={employeeColumns}
            formFields={employeeFormFields}
            createActionsColumn={createEmployeeActionsColumn}
            defaultValues={{ employmentStartDate: getTodayDate() }}
            addButtonLabel="Додати працівника"
            createTitle="Створити працівника"
            editTitle="Редагувати працівника"
            deleteConfirmDescription="Ви дійсно хочете видалити цього співробітника?"
            onCreate={async (employee) => {
                await dispatch(
                    createEmployee({
                        coffeeShopId,
                        employee,
                    }),
                ).unwrap();

                await dispatch(getAllEmployees(coffeeShopId));
            }}
            onUpdate={async (employee) => {
                await dispatch(
                    updateEmployee({
                        coffeeShopId,
                        employee,
                    }),
                ).unwrap();

                await dispatch(getAllEmployees(coffeeShopId));
            }}
            onDelete={async (id) => {
                await dispatch(
                    deleteEmployee({
                        coffeeShopId,
                        id,
                    }),
                ).unwrap();
            }}
            exportConfig={{
                fileName: "employees",
                sheetName: "Працівники",
            }}
            stickyHeader={false}
        />
    );
}
