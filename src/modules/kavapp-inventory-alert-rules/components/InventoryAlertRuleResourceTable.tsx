"use client";

import { useEffect, useState } from "react";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { fetchKavappCatalog } from "@/modules/kavapp-inventory/services/kavapp-inventory-api";
import { KavappCatalogItem } from "@/modules/kavapp-inventory/types/kavapp-catalog-item";
import { createInventoryAlertRuleActionsColumn } from "@/modules/kavapp-inventory-alert-rules/configs/inventory-alert-rule-actions";
import { inventoryAlertRuleColumns } from "@/modules/kavapp-inventory-alert-rules/configs/inventory-alert-rule-columns";
import { InventoryAlertRule } from "@/modules/kavapp-inventory-alert-rules/types/inventory-alert-rule";
import {
    createInventoryAlertRule,
    deleteInventoryAlertRule,
    getAllInventoryAlertRules,
    updateInventoryAlertRule,
} from "@/modules/kavapp-inventory-alert-rules/model/inventory-alert-rule-thunks";
import { createInventoryAlertRuleFields } from "@/modules/kavapp-inventory-alert-rules/configs/inventory-alert-rule-fields";
import {
    createInventoryAlertRuleCatalogOptions,
    prepareRulePayload,
} from "@/modules/kavapp-inventory-alert-rules/components/inventoryAlertRuleResourceTable.funcs";

interface InventoryAlertRuleResourceTableProps {
    coffeeShopId: string;
}

export function InventoryAlertRuleResourceTable({ coffeeShopId }: InventoryAlertRuleResourceTableProps) {
    const dispatch = useAppDispatch();
    const inventoryAlertRules = useAppSelector((state) => state.inventoryAlertRules.data);
    const isLoading = useAppSelector((state) => state.inventoryAlertRules.loading);
    const [kavappCatalogItems, setKavappCatalogItems] = useState<KavappCatalogItem[]>([]);

    const inventoryAlertRuleCatalogOptions = createInventoryAlertRuleCatalogOptions(
        kavappCatalogItems,
        inventoryAlertRules,
    );

    useEffect(() => {
        dispatch(getAllInventoryAlertRules(coffeeShopId));
        fetchKavappCatalog(coffeeShopId).then(setKavappCatalogItems);
    }, [dispatch, coffeeShopId]);

    return (
        <ResourceTable<InventoryAlertRule>
            title="Правила сповіщень про залишки"
            data={inventoryAlertRules}
            isLoading={isLoading}
            columns={inventoryAlertRuleColumns}
            formFields={createInventoryAlertRuleFields(inventoryAlertRuleCatalogOptions)}
            createActionsColumn={createInventoryAlertRuleActionsColumn}
            addButtonLabel="Додати правило"
            createTitle="Нове правило сповіщення"
            editTitle="Редагувати правило сповіщення"
            deleteConfirmDescription="Ви дійсно хочете видалити це правило?"
            stickyHeader={true}
            onCreate={async (values) => {
                await dispatch(
                    createInventoryAlertRule({
                        coffeeShopId,
                        payload: prepareRulePayload(values, kavappCatalogItems),
                    }),
                ).unwrap();
            }}
            onUpdate={async (values) => {
                await dispatch(
                    updateInventoryAlertRule({
                        coffeeShopId,
                        id: values._id,
                        payload: prepareRulePayload(values, kavappCatalogItems),
                    }),
                ).unwrap();
            }}
            onDelete={async (id) => {
                await dispatch(
                    deleteInventoryAlertRule({
                        coffeeShopId,
                        id,
                    }),
                ).unwrap();
            }}
            exportConfig={{ fileName: "inventory-alert-rules", sheetName: "Правила сповіщень" }}
        />
    );
}
