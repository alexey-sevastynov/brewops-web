"use client";

import { useEffect } from "react";
import { ExpenseReport } from "@/modules/expense-report/types/expense-report";
import { createExpenseReportActionsColumn } from "@/modules/expense-report/configs/expense-report-actions";
import { expenseReportColumns } from "@/modules/expense-report/configs/expense-report-columns";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { expenseReportFormFields } from "@/modules/expense-report/configs/expense-report-form-fields";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import {
    createExpenseReport,
    deleteExpenseReport,
    getAllExpenseReports,
    updateExpenseReport,
} from "@/modules/expense-report/model/expense-report-thunks";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

export function ExpenseReportResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state) => state.expenseReport.data);
    const isLoadingReports = useAppSelector((state) => state.expenseReport.loading);

    useEffect(() => {
        dispatch(getAllExpenseReports(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<ExpenseReport>
            title="Звіти про витрати"
            data={reports}
            isLoading={isLoadingReports}
            columns={expenseReportColumns}
            formFields={expenseReportFormFields}
            createActionsColumn={createExpenseReportActionsColumn}
            addButtonLabel="Додати звіт"
            createTitle="Створити звіт про витрати"
            editTitle="Редагувати звіт про витрати"
            deleteConfirmDescription="Ви дійсно хочете видалити цей звіт про витрати?"
            onCreate={async (expenseReport) => {
                await dispatch(createExpenseReport({ coffeeShopId, expenseReport })).unwrap();
                await dispatch(getAllExpenseReports(coffeeShopId));
            }}
            onUpdate={async (expenseReport) => {
                await dispatch(updateExpenseReport({ coffeeShopId, expenseReport })).unwrap();
                await dispatch(getAllExpenseReports(coffeeShopId));
            }}
            onDelete={async (id) => {
                await dispatch(deleteExpenseReport({ coffeeShopId, id })).unwrap();
            }}
            exportConfig={{
                fileName: "expense-reports",
                sheetName: "Звіти про витрати",
            }}
            stickyHeader={true}
        />
    );
}
