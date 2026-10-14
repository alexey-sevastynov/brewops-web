"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { resourceNames } from "@/shared/constants/resource-names";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { expenseReportColumns } from "@/modules/expense-report/configs/expense-report-columns";
import { expenseReportFormFields } from "@/modules/expense-report/configs/expense-report-form-fields";
import { createExpenseReportActionsColumn } from "@/modules/expense-report/configs/expense-report-actions";
import {
    createExpenseReport,
    deleteExpenseReport,
    getAllExpenseReports,
    updateExpenseReport,
} from "@/modules/expense-report/model/expense-report-thunks";

export function ExpenseReportResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state) => state.expenseReport.data);
    const isLoadingReports = useAppSelector((state) => state.expenseReport.loading);
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.expenseReports,
    );

    useEffect(() => {
        dispatch(getAllExpenseReports(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<ExpenseReport>
            title={routeLabels.expenseReports}
            data={reports}
            isLoading={isLoadingReports}
            columns={expenseReportColumns}
            formFields={expenseReportFormFields}
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createExpenseReportActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати звіт" : undefined}
            createTitle="Створити звіт про витрати"
            editTitle="Редагувати звіт про витрати"
            deleteConfirmDescription="Ви дійсно хочете видалити цей звіт про витрати?"
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (expenseReport) => {
                          await dispatch(createExpenseReport({ coffeeShopId, expenseReport })).unwrap();
                          await dispatch(getAllExpenseReports(coffeeShopId));
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (expenseReport) => {
                          await dispatch(updateExpenseReport({ coffeeShopId, expenseReport })).unwrap();
                          await dispatch(getAllExpenseReports(coffeeShopId));
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(deleteExpenseReport({ coffeeShopId, id })).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "expense-reports",
                sheetName: routeLabels.expenseReports,
            }}
            stickyHeader={true}
        />
    );
}
