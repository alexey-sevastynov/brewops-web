"use client";

import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";
import { createInventoryAuditActionsColumn } from "@/modules/inventory-audit/configs/inventory-audit-actions";
import { inventoryAuditColumns } from "@/modules/inventory-audit/configs/inventory-audit-columns";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { inventoryAuditFormFields } from "@/modules/inventory-audit/configs/inventory-audit-form-fields";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import {
    createInventoryAudit,
    deleteInventoryAudit,
    getAllInventoryAudits,
    updateInventoryAudit,
} from "@/modules/inventory-audit/model/inventory-audit-thunks";
import { useEffect } from "react";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

export function InventoryAuditResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();

    const audits = useAppSelector((state) => state.inventoryAudit.data);
    const isLoadingAudits = useAppSelector((state) => state.inventoryAudit.loading);

    useEffect(() => {
        dispatch(getAllInventoryAudits(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<InventoryAudit>
            title="Аудит інвентаризації"
            data={audits}
            isLoading={isLoadingAudits}
            columns={inventoryAuditColumns}
            formFields={inventoryAuditFormFields}
            createActionsColumn={createInventoryAuditActionsColumn}
            addButtonLabel="Додати аудит"
            createTitle="Створити аудит інвентаризації"
            editTitle="Редагувати аудит інвентаризації"
            deleteConfirmDescription="Ви дійсно хочете видалити цей аудит інвентаризації?"
            stickyHeader={true}
            onCreate={async (inventoryAudit) => {
                await dispatch(createInventoryAudit({ coffeeShopId, inventoryAudit })).unwrap();
                await dispatch(getAllInventoryAudits(coffeeShopId));
            }}
            onUpdate={async (inventoryAudit) => {
                await dispatch(updateInventoryAudit({ coffeeShopId, inventoryAudit })).unwrap();
                await dispatch(getAllInventoryAudits(coffeeShopId));
            }}
            onDelete={async (id) => {
                await dispatch(deleteInventoryAudit({ coffeeShopId, id })).unwrap();
            }}
            exportConfig={{
                fileName: "inventory-audits",
                sheetName: "Аудити інвентаризації",
            }}
        />
    );
}
