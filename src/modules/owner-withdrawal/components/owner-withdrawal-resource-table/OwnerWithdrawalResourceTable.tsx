"use client";

import { useEffect } from "react";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { getTodayDate } from "@/shared/utils/date";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { OwnerWithdrawal } from "@/modules/owner-withdrawal/types/owner-withdrawal";
import { createOwnerWithdrawalActionsColumn } from "@/modules/owner-withdrawal/configs/owner-withdrawal-actions";
import { ownerWithdrawalColumns } from "@/modules/owner-withdrawal/configs/owner-withdrawal-columns";
import { ownerWithdrawalFormFields } from "@/modules/owner-withdrawal/configs/owner-withdrawal-form-fields";
import {
    createOwnerWithdrawal,
    deleteOwnerWithdrawal,
    getAllOwnerWithdrawals,
    updateOwnerWithdrawal,
} from "@/modules/owner-withdrawal/model/owner-withdrawal-thunks";

const defaultOwnerWithdrawalValues: Partial<OwnerWithdrawal> = {
    withdrawalDate: getTodayDate(),
} as const;

export function OwnerWithdrawalResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const withdrawals = useAppSelector((state) => state.ownerWithdrawal.data);
    const isLoadingWithdrawals = useAppSelector((state) => state.ownerWithdrawal.loading);
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.ownerWithdrawals,
    );

    useEffect(() => {
        dispatch(getAllOwnerWithdrawals(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<OwnerWithdrawal>
            title={routeLabels.ownerWithdrawals}
            data={withdrawals}
            isLoading={isLoadingWithdrawals}
            columns={ownerWithdrawalColumns}
            formFields={ownerWithdrawalFormFields}
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createOwnerWithdrawalActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати виведення" : undefined}
            createTitle="Створити виведення коштів"
            editTitle="Редагувати виведення коштів"
            deleteConfirmDescription="Ви дійсно хочете видалити це виведення коштів?"
            defaultValues={defaultOwnerWithdrawalValues}
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (withdrawal) => {
                          await dispatch(
                              createOwnerWithdrawal({
                                  coffeeShopId,
                                  withdrawal,
                              }),
                          ).unwrap();

                          await dispatch(getAllOwnerWithdrawals(coffeeShopId));
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (withdrawal) => {
                          await dispatch(
                              updateOwnerWithdrawal({
                                  coffeeShopId,
                                  withdrawal,
                              }),
                          ).unwrap();

                          await dispatch(getAllOwnerWithdrawals(coffeeShopId));
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(
                              deleteOwnerWithdrawal({
                                  coffeeShopId,
                                  id,
                              }),
                          ).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "owner-withdrawals",
                sheetName: routeLabels.ownerWithdrawals,
            }}
        />
    );
}
