"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { resourceNames } from "@/shared/constants/resource-names";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { InventoryAudit } from "@/modules/inventory-audit/types/inventory-audit";
import { inventoryAuditFormFields } from "@/modules/inventory-audit/configs/inventory-audit-form-fields";
import { createInventoryAuditActionsColumn } from "@/modules/inventory-audit/configs/inventory-audit-actions";
import { inventoryAuditColumns } from "@/modules/inventory-audit/configs/inventory-audit-columns";
import {
    createInventoryAudit,
    deleteInventoryAudit,
    getAllInventoryAudits,
    updateInventoryAudit,
} from "@/modules/inventory-audit/model/inventory-audit-thunks";

export function InventoryAuditResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();

    const audits = useAppSelector((state) => state.inventoryAudit.data);
    const isLoadingAudits = useAppSelector((state) => state.inventoryAudit.loading);
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.inventoryAudits,
    );

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
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createInventoryAuditActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати аудит" : undefined}
            createTitle="Створити аудит інвентаризації"
            editTitle="Редагувати аудит інвентаризації"
            deleteConfirmDescription="Ви дійсно хочете видалити цей аудит інвентаризації?"
            stickyHeader={true}
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (inventoryAudit) => {
                          await dispatch(createInventoryAudit({ coffeeShopId, inventoryAudit })).unwrap();
                          await dispatch(getAllInventoryAudits(coffeeShopId));
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (inventoryAudit) => {
                          await dispatch(updateInventoryAudit({ coffeeShopId, inventoryAudit })).unwrap();
                          await dispatch(getAllInventoryAudits(coffeeShopId));
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(deleteInventoryAudit({ coffeeShopId, id })).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "inventory-audits",
                sheetName: routeLabels.inventoryAudits,
            }}
        />
    );
}
