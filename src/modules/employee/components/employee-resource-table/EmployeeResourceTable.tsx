"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { getTodayDate } from "@/shared/utils/date";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { resourceNames } from "@/shared/constants/resource-names";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
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
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.employees,
    );

    useEffect(() => {
        dispatch(getAllEmployees(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<Employee>
            title={routeLabels.employees}
            data={employees}
            isLoading={isLoadingEmployees}
            columns={employeeColumns}
            formFields={employeeFormFields}
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createEmployeeActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            defaultValues={{ employmentStartDate: getTodayDate() }}
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати працівника" : undefined}
            createTitle="Створити працівника"
            editTitle="Редагувати працівника"
            deleteConfirmDescription="Ви дійсно хочете видалити цього співробітника?"
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (employee) => {
                          await dispatch(createEmployee({ coffeeShopId, employee })).unwrap();
                          await dispatch(getAllEmployees(coffeeShopId));
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (employee) => {
                          await dispatch(updateEmployee({ coffeeShopId, employee })).unwrap();
                          await dispatch(getAllEmployees(coffeeShopId));
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(deleteEmployee({ coffeeShopId, id })).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "employees",
                sheetName: routeLabels.employees,
            }}
            stickyHeader={false}
        />
    );
}
