"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { resourceNames } from "@/shared/constants/resource-names";
import { getTodayDate } from "@/shared/utils/date";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { createFacilityExpenseActionsColumn } from "@/modules/facility-expense/configs/facility-expense-actions";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { FacilityExpense } from "@/modules/facility-expense/types/facility-expense";
import { facilityExpenseColumns } from "@/modules/facility-expense/configs/facility-expense-columns";
import { facilityExpenseFormFields } from "@/modules/facility-expense/configs/facility-expense-form-fields";
import {
    createFacilityExpense,
    deleteFacilityExpense,
    getAllFacilityExpenses,
    updateFacilityExpense,
} from "@/modules/facility-expense/model/facility-expense-thunks";

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
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.facilityExpenses,
    );

    useEffect(() => {
        dispatch(getAllFacilityExpenses(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<FacilityExpense>
            title={routeLabels.facilityExpenses}
            data={expenses}
            isLoading={isLoadingExpenses}
            columns={facilityExpenseColumns}
            formFields={facilityExpenseFormFields}
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createFacilityExpenseActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати витрату" : undefined}
            createTitle="Створити витрату закладу"
            editTitle="Редагувати витрату закладу"
            deleteConfirmDescription="Ви дійсно хочете видалити эту витрату?"
            defaultValues={defaultFacilityExpenseValues}
            stickyHeader={true}
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (expense) => {
                          await dispatch(createFacilityExpense({ coffeeShopId, expense })).unwrap();
                          await dispatch(getAllFacilityExpenses(coffeeShopId));
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (expense) => {
                          await dispatch(updateFacilityExpense({ coffeeShopId, expense })).unwrap();
                          await dispatch(getAllFacilityExpenses(coffeeShopId));
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(deleteFacilityExpense({ coffeeShopId, id })).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "facility-expenses",
                sheetName: routeLabels.facilityExpenses,
            }}
        />
    );
}
