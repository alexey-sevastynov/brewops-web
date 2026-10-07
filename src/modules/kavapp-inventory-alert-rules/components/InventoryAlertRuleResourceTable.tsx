"use client";

import { useEffect, useState } from "react";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { resourceNames } from "@/shared/constants/resource-names";
import { routeLabels } from "@/shared/constants/route-labels";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { isFreePlan } from "@/modules/workspace/utils/guards";
import { selectWorkspaceByCoffeeShopId } from "@/modules/workspace/model/workspace-selectors";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { KavappPlanRestrictedNotice } from "@/modules/kavapp-inventory/components/KavappPlanRestrictedNotice";
import { fetchKavappCatalog } from "@/modules/kavapp-inventory/services/kavapp-inventory-api";
import { KavappCatalogItem } from "@/modules/kavapp-inventory/types/kavapp-catalog-item";
import { createInventoryAlertRuleActionsColumn } from "@/modules/kavapp-inventory-alert-rules/configs/inventory-alert-rule-actions";
import { inventoryAlertRuleColumns } from "@/modules/kavapp-inventory-alert-rules/configs/inventory-alert-rule-columns";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import { createInventoryAlertRuleFields } from "@/modules/kavapp-inventory-alert-rules/configs/inventory-alert-rule-fields";
import {
    createInventoryAlertRule,
    deleteInventoryAlertRule,
    getAllInventoryAlertRules,
    updateInventoryAlertRule,
} from "@/modules/kavapp-inventory-alert-rules/model/inventory-alert-rule-thunks";
import {
    createInventoryAlertRuleCatalogOptions,
    prepareRulePayload,
} from "@/modules/kavapp-inventory-alert-rules/components/inventoryAlertRuleResourceTable.funcs";

export function InventoryAlertRuleResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const workspace = useAppSelector((state) => selectWorkspaceByCoffeeShopId(state, coffeeShopId));
    const inventoryAlertRules = useAppSelector((state) => state.inventoryAlertRules.data);
    const isLoading = useAppSelector((state) => state.inventoryAlertRules.loading);
    const [kavappCatalogItems, setKavappCatalogItems] = useState<KavappCatalogItem[]>([]);

    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.kavapp,
    );

    useEffect(() => {
        if (workspace?.planKey && isFreePlan(workspace.planKey)) return;

        dispatch(getAllInventoryAlertRules(coffeeShopId));
        fetchKavappCatalog(coffeeShopId).then(setKavappCatalogItems);
    }, [dispatch, coffeeShopId, workspace]);

    if (workspace?.planKey && isFreePlan(workspace.planKey)) return <KavappPlanRestrictedNotice />;

    return (
        <ResourceTable<InventoryAlertRule>
            title={routeLabels.kavappInventoryAlertRules}
            data={inventoryAlertRules}
            isLoading={isLoading}
            columns={inventoryAlertRuleColumns}
            formFields={createInventoryAlertRuleFields(
                createInventoryAlertRuleCatalogOptions(kavappCatalogItems, inventoryAlertRules),
            )}
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createInventoryAlertRuleActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати правило" : undefined}
            createTitle="Нове правило сповіщення"
            editTitle="Редагувати правило сповіщення"
            deleteConfirmDescription="Ви дійсно хочете видалити це правило?"
            stickyHeader={true}
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (values) => {
                          await dispatch(
                              createInventoryAlertRule({
                                  coffeeShopId,
                                  payload: prepareRulePayload(values, kavappCatalogItems),
                              }),
                          ).unwrap();
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (values) => {
                          await dispatch(
                              updateInventoryAlertRule({
                                  coffeeShopId,
                                  id: values._id,
                                  payload: prepareRulePayload(values, kavappCatalogItems),
                              }),
                          ).unwrap();
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(
                              deleteInventoryAlertRule({
                                  coffeeShopId,
                                  id,
                              }),
                          ).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "inventory-alert-rules",
                sheetName: routeLabels.kavappInventoryAlertRules,
            }}
        />
    );
}
