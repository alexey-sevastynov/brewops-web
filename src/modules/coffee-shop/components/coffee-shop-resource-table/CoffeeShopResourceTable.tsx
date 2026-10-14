"use client";

import { useMemo, useState } from "react";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { appToast } from "@/shared/lib/toast";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { coffeeShopColumns } from "@/modules/coffee-shop/configs/coffee-shop-columns";
import { getCoffeeShopFormFields } from "@/modules/coffee-shop/configs/coffee-shop-form-fields";
import { CoffeeShopDeleteModal } from "@/modules/coffee-shop/components/coffee-shop-resource-table/coffee-shop-delete-modal/CoffeeShopDeleteModal";
import { createCoffeeShopActionsColumn } from "@/modules/coffee-shop/configs/coffee-shop-config";
import {
    createCoffeeShop,
    getCoffeeShops,
    updateCoffeeShop,
    deleteCoffeeShop,
} from "@/modules/coffee-shop/model/coffee-shop-thunks";
import { selectCurrentWorkspace } from "@/modules/workspace/model/workspace-selectors";
import { isFreePlan, isOwnerRole } from "@/modules/workspace/utils/guards";
import { Workspace } from "@/modules/workspace/types/workspace";

interface CoffeeShopResourceTableProps {
    title?: string;
}

export function CoffeeShopResourceTable({ title = "Кавʼярні" }: CoffeeShopResourceTableProps) {
    const dispatch = useAppDispatch();
    const currentWorkspace = useAppSelector(selectCurrentWorkspace);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const isLoading = useAppSelector((state) => state.coffeeShop.isLoading);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deletingShopId, setDeletingShopId] = useState<string | null>(null);
    const activeDeletingShop = findCoffeeShopById(coffeeShops, deletingShopId);

    const formFields = useMemo(
        () => getCoffeeShopFormFields(currentWorkspace?.planKey && isFreePlan(currentWorkspace?.planKey)),
        [currentWorkspace?.planKey],
    );

    if (!currentWorkspace?._id) return null;

    const handleDeleteConfirm = async () => {
        if (!deletingShopId) return;

        setDeleteLoading(true);

        try {
            await dispatch(deleteCoffeeShop(deletingShopId)).unwrap();

            setDeletingShopId(null);

            await dispatch(getCoffeeShops(currentWorkspace._id));
        } catch {
            appToast.error("Не вдалося видалити кав'ярню");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <>
            <ResourceTable<CoffeeShop>
                title={title}
                data={coffeeShops}
                isLoading={isLoading}
                columns={coffeeShopColumns}
                formFields={formFields}
                createActionsColumn={(_, onEdit) =>
                    createCoffeeShopActionsColumn((id) => setDeletingShopId(id), onEdit)
                }
                defaultValues={{ isActive: true }}
                addButtonLabel={canCreateCoffeeShop(currentWorkspace) ? "Додати кавʼярню" : undefined}
                createTitle="Створити кавʼярню"
                editTitle="Редагувати кавʼярню"
                onCreate={async (coffeeShop) => {
                    await dispatch(
                        createCoffeeShop({ workspaceId: currentWorkspace._id, coffeeShop }),
                    ).unwrap();
                    await dispatch(getCoffeeShops(currentWorkspace._id));
                }}
                onUpdate={async (coffeeShop) => {
                    await dispatch(
                        updateCoffeeShop({ workspaceId: currentWorkspace._id, coffeeShop }),
                    ).unwrap();
                    await dispatch(getCoffeeShops(currentWorkspace._id));
                }}
                exportConfig={{ fileName: "coffee-shops", sheetName: "Кавʼярні" }}
                showPagination={false}
                showFilters={false}
                showColumnVisibility={false}
                showExport={false}
            />
            {activeDeletingShop && (
                <CoffeeShopDeleteModal
                    coffeeShop={activeDeletingShop}
                    open={!!deletingShopId}
                    loading={deleteLoading}
                    onOpenChange={(open) => {
                        if (!open) {
                            setDeletingShopId(null);
                        }
                    }}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </>
    );
}

function findCoffeeShopById(coffeeShops: CoffeeShop[], coffeeShopId: string | null) {
    return coffeeShops.find((coffeeShop) => coffeeShop._id === coffeeShopId);
}

function canCreateCoffeeShop(workspace?: Workspace) {
    if (!workspace) return false;

    return workspace.isOwner || isOwnerRole(workspace.role);
}
