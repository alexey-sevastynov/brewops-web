"use client";

import { useEffect } from "react";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { getTodayDate } from "@/shared/utils/date";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
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

    useEffect(() => {
        dispatch(getAllOwnerWithdrawals(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<OwnerWithdrawal>
            title="Виведення коштів власником"
            data={withdrawals}
            isLoading={isLoadingWithdrawals}
            columns={ownerWithdrawalColumns}
            formFields={ownerWithdrawalFormFields}
            createActionsColumn={createOwnerWithdrawalActionsColumn}
            addButtonLabel="Додати виведення"
            createTitle="Створити виведення коштів"
            editTitle="Редагувати виведення коштів"
            deleteConfirmDescription="Ви дійсно хочете видалити це виведення коштів?"
            defaultValues={defaultOwnerWithdrawalValues}
            onCreate={async (withdrawal) => {
                await dispatch(
                    createOwnerWithdrawal({
                        coffeeShopId,
                        withdrawal,
                    }),
                ).unwrap();

                await dispatch(getAllOwnerWithdrawals(coffeeShopId));
            }}
            onUpdate={async (withdrawal) => {
                await dispatch(
                    updateOwnerWithdrawal({
                        coffeeShopId,
                        withdrawal,
                    }),
                ).unwrap();

                await dispatch(getAllOwnerWithdrawals(coffeeShopId));
            }}
            onDelete={async (id) => {
                await dispatch(
                    deleteOwnerWithdrawal({
                        coffeeShopId,
                        id,
                    }),
                ).unwrap();
            }}
            exportConfig={{
                fileName: "owner-withdrawals",
                sheetName: "Виведення коштів власником",
            }}
        />
    );
}
