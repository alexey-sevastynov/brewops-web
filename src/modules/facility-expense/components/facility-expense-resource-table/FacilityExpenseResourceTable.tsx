"use client";

import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";
import { createFacilityExpenseActionsColumn } from "@/modules/facility-expense/configs/facility-expense-actions";
import { facilityExpenseColumns } from "@/modules/facility-expense/configs/facility-expense-columns";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { facilityExpenseFormFields } from "@/modules/facility-expense/configs/facility-expense-form-fields";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import {
    createFacilityExpense,
    deleteFacilityExpense,
    getAllFacilityExpenses,
    updateFacilityExpense,
} from "@/modules/facility-expense/model/facility-expense-thunks";
import { getTodayDate } from "@/shared/utils/date";
import { useEffect } from "react";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

const defaultFacilityExpenseValues: Partial<FacilityExpense> = {
    date: getTodayDate(),
    period: getTodayDate(),
    title: "Прибирання",
    amount: 350,
} as const;

export function FacilityExpenseResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const expenses = useAppSelector((state) => state.facilityExpense.data);
    const isLoadingExpenses = useAppSelector((state) => state.facilityExpense.loading);

    useEffect(() => {
        dispatch(getAllFacilityExpenses(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<FacilityExpense>
            title="Оренда та утримання приміщення"
            data={expenses}
            isLoading={isLoadingExpenses}
            columns={facilityExpenseColumns}
            formFields={facilityExpenseFormFields}
            createActionsColumn={createFacilityExpenseActionsColumn}
            addButtonLabel="Додати витрату"
            createTitle="Створити витрату закладу"
            editTitle="Редагувати витрату закладу"
            deleteConfirmDescription="Ви дійсно хочете видалити эту витрату?"
            defaultValues={defaultFacilityExpenseValues}
            stickyHeader={true}
            onCreate={async (expense) => {
                await dispatch(createFacilityExpense({ coffeeShopId, expense })).unwrap();
                await dispatch(getAllFacilityExpenses(coffeeShopId));
            }}
            onUpdate={async (expense) => {
                await dispatch(updateFacilityExpense({ coffeeShopId, expense })).unwrap();
                await dispatch(getAllFacilityExpenses(coffeeShopId));
            }}
            onDelete={async (id) => {
                await dispatch(deleteFacilityExpense({ coffeeShopId, id })).unwrap();
            }}
            exportConfig={{
                fileName: "facility-expenses",
                sheetName: "Оренда та утримання приміщення",
            }}
        />
    );
}
