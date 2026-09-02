/* eslint-disable max-lines-per-function */
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { useResourceTable } from "@/shared/lib/react-table/use-resource-table";
import { createTableConfig } from "@/shared/lib/react-table/table-config";
import { Title } from "@/shared/ui/typography/title/Title";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { TableToolbox } from "@/shared/ui/table-toolbox/TableToolbox";
import { Table } from "@/shared/ui/table/Table";
import { TablePager } from "@/shared/ui/table-pager/TablePager";
import { textPositions } from "@/shared/ui/typography/text-position";
import { defaultTablePageSize } from "@/shared/lib/react-table/constants";
import { appToast } from "@/shared/lib/toast";
import { kavappInventoryColumns } from "@/modules/kavapp-inventory/configs/kavapp-inventory-columns";
import { KavappInventoryItem } from "@/modules/kavapp-inventory/types/kavapp-inventory-item";
import {
    KavappInventoryCategoryKey,
    kavappInventoryCategoryKeys,
} from "@/modules/kavapp-inventory/enums/kavapp-inventory-category-key";
import { KavappInventoryCategoryTabs } from "@/modules/kavapp-inventory/components/kavapp-inventory-category-tabs/KavappInventoryCategoryTabs";
import { KavappInventoryHeader } from "@/modules/kavapp-inventory/components/kavapp-inventory-header/KavappInventoryHeader";
import {
    getAllKavappInventory,
    getLatestKavappSnapshot,
    syncKavappInventory,
} from "@/modules/kavapp-inventory/model/kavapp-inventory-thunks";

export function KavappInventoryTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const inventory = useAppSelector((state) => state.kavappInventory.inventory);
    const latestSnapshot = useAppSelector((state) => state.kavappInventory.latestSnapshot);
    const isLoading = useAppSelector((state) => state.kavappInventory.loading);
    const isSyncing = useAppSelector((state) => state.kavappInventory.syncing);

    const [activeCategory, setActiveCategory] = useState<KavappInventoryCategoryKey>(
        kavappInventoryCategoryKeys.product,
    );

    useEffect(() => {
        dispatch(getAllKavappInventory({ coffeeShopId }));
        dispatch(getLatestKavappSnapshot({ coffeeShopId }));
    }, [dispatch, coffeeShopId]);

    const filteredData: KavappInventoryItem[] = useMemo(() => {
        if (!inventory) return [];

        if (activeCategory === kavappInventoryCategoryKeys.all) {
            return [...inventory.cup, ...inventory.ingredient, ...inventory.product, ...inventory.kitchen];
        }

        return inventory[activeCategory] ?? [];
    }, [inventory, activeCategory]);

    const handleSync = useCallback(async () => {
        try {
            await dispatch(syncKavappInventory({ coffeeShopId })).unwrap();
            appToast.success("Синхронізація пройшла успішно");
            await dispatch(getAllKavappInventory({ coffeeShopId }));
            await dispatch(getLatestKavappSnapshot({ coffeeShopId }));
        } catch {
            appToast.error("Помилка синхронізації");
        }
    }, [dispatch, coffeeShopId]);

    const resourceTable = useResourceTable<KavappInventoryItem>();

    const reactTable = useReactTable({
        data: filteredData,
        columns: kavappInventoryColumns,
        state: resourceTable.tableState,
        onSortingChange: resourceTable.setSorting,
        onColumnFiltersChange: resourceTable.setColumnFilters,
        onColumnVisibilityChange: resourceTable.setColumnVisibility,
        onPaginationChange: resourceTable.setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableSorting: true,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        meta: {
            exportFileName: "kavapp-inventory",
            exportSheetName: "Наявність товару на торговій точці",
        },
    });

    const lastSyncDate = latestSnapshot?.syncDate ?? null;

    return (
        <div className="w-full">
            <Title textPosition={textPositions.left}>Наявність товару на торговій точці</Title>
            <div className="mb-4 flex flex-col gap-4">
                <KavappInventoryHeader
                    lastSyncDate={lastSyncDate}
                    isSyncing={isSyncing}
                    onSync={handleSync}
                    coffeeShopId={coffeeShopId}
                />
                <KavappInventoryCategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </div>
            <TableToolbox reactTable={reactTable} />
            <Table
                config={createTableConfig({
                    reactTable: reactTable,
                    isLoading: isLoading,
                    noDataMessage: "Немає даних для відображення",
                    stickyHeader: true,
                })}
            />
            <TablePager
                currentPage={reactTable.getState().pagination.pageIndex + 1}
                pageSize={reactTable.getState().pagination.pageSize}
                totalRows={reactTable.getFilteredRowModel().rows.length}
                pageCount={reactTable.getPageCount()}
                canNext={reactTable.getCanNextPage()}
                canPrevious={reactTable.getCanPreviousPage()}
                pageSizeOptions={[defaultTablePageSize, 50, 100]}
                onPageChange={(page) => reactTable.setPageIndex(page - 1)}
                onPageSizeChange={(size) => reactTable.setPageSize(size)}
            />
        </div>
    );
}
