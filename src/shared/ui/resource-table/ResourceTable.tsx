// TODO : Remove max-lines-per-function eslint-disable when the component is refactored into smaller components
/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
import { useMemo } from "react";
import { FieldValues, DefaultValues } from "react-hook-form";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { useResourceTable } from "@/shared/lib/react-table/use-resource-table";
import { Title } from "@/shared/ui/typography/title/Title";
import { TableToolbox } from "@/shared/ui/table-toolbox/TableToolbox";
import { Table } from "@/shared/ui/table/Table";
import { TablePager } from "@/shared/ui/table-pager/TablePager";
import { createTableConfig } from "@/shared/lib/react-table/table-config";
import { ResourceFormModal } from "@/shared/ui/form/resource-form-modal/ResourceFormModal";
import { DeleteConfirmModal } from "@/shared/ui/modal-window/delete-confirm-modal/DeleteConfirmModal";
import { formModes } from "@/shared/ui/form/form-mode";
import { ResourceField } from "@/shared/types/resource-field";
import { textPositions } from "@/shared/ui/typography/text-position";
import {
    executeCreate,
    executeDelete,
    executeUpdate,
    getResourceTableColumns,
} from "@/shared/ui/resource-table/ResourceTable.funcs";
import { defaultTablePageSize } from "@/shared/lib/react-table/constants";

interface ResourceTableProps<T extends FieldValues> {
    title: string;
    data: T[];
    isLoading?: boolean;
    columns: ColumnDef<T>[];
    formFields?: ResourceField<T>[];
    defaultValues?: DefaultValues<T>;
    addButtonLabel?: string;
    createTitle?: string;
    editTitle?: string;
    deleteConfirmDescription?: string;
    onCreate?: (data: T) => Promise<void>;
    onUpdate?: (data: T) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    createActionsColumn?: (onDelete: (id: string) => void, onEdit: (item: T) => void) => ColumnDef<T>;
    exportConfig?: {
        fileName: string;
        sheetName: string;
    };
    stickyHeader?: boolean;
    children?: React.ReactNode;
    showPagination?: boolean;
    showExport?: boolean;
    showFilters?: boolean;
    showColumnVisibility?: boolean;
}

export function ResourceTable<T extends FieldValues>({
    title,
    data,
    isLoading,
    columns: baseColumns,
    formFields,
    defaultValues,
    addButtonLabel,
    createTitle,
    editTitle,
    deleteConfirmDescription = "Ви дійсно хочете видалити цей запис?",
    onCreate,
    onUpdate,
    onDelete,
    createActionsColumn,
    exportConfig,
    stickyHeader = false,
    children,
    showPagination = true,
    showExport = true,
    showFilters = true,
    showColumnVisibility = true,
}: ResourceTableProps<T>) {
    const resourceTable = useResourceTable<T>();

    const columns = useMemo(() => {
        return getResourceTableColumns<T>({
            baseColumns,
            createActionsColumn,
            onDelete: (id: string) => {
                resourceTable.crud.setDeletingItemId(id);
                resourceTable.crud.setIsDeleteModalOpen(true);
            },
            onEdit: (item: T) => resourceTable.crud.setEditingItem(item),
        });
    }, [baseColumns, createActionsColumn, resourceTable.crud]);

    const reactTable = useReactTable({
        data,
        columns,
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
        meta: exportConfig
            ? {
                  exportFileName: exportConfig.fileName,
                  exportSheetName: exportConfig.sheetName,
              }
            : undefined,
    });

    return (
        <div className="w-full">
            <Title textPosition={textPositions.left}>{title}</Title>
            <TableToolbox
                reactTable={reactTable}
                showExport={showExport}
                showFilters={showFilters}
                showColumnVisibility={showColumnVisibility}
            >
                {children}
                {formFields && onCreate && (
                    <ResourceFormModal<T>
                        fields={formFields}
                        onSubmit={(values) =>
                            executeCreate<T>(values, resourceTable.crud.setIsCreating, onCreate)
                        }
                        formMode={formModes.create}
                        addButtonLabel={addButtonLabel}
                        createTitle={createTitle}
                        defaultValues={defaultValues}
                        loading={resourceTable.crud.isCreating}
                    />
                )}
            </TableToolbox>
            {onDelete && (
                <DeleteConfirmModal
                    open={resourceTable.crud.isDeleteModalOpen}
                    onOpenChange={(open) => {
                        resourceTable.crud.setIsDeleteModalOpen(open);

                        if (!open) {
                            resourceTable.crud.setDeletingItemId(null);
                        }
                    }}
                    onConfirm={() =>
                        executeDelete(
                            resourceTable.crud.deletingItemId,
                            resourceTable.crud.setIsDeleting,
                            () => resourceTable.crud.setIsDeleteModalOpen(false),
                            () => resourceTable.crud.setDeletingItemId(null),
                            onDelete,
                        )
                    }
                    description={deleteConfirmDescription}
                    loading={resourceTable.crud.isDeleting}
                />
            )}
            {formFields && onUpdate && resourceTable.crud.editingItem && (
                <ResourceFormModal<T>
                    fields={formFields}
                    onSubmit={(values) =>
                        executeUpdate<T>(
                            values,
                            resourceTable.crud.setIsUpdating,
                            () => resourceTable.crud.setEditingItem(null),
                            onUpdate,
                        )
                    }
                    formMode={formModes.edit}
                    onClose={() => resourceTable.crud.setEditingItem(null)}
                    editTitle={editTitle}
                    defaultValues={resourceTable.crud.editingItem as DefaultValues<T>}
                    loading={resourceTable.crud.isUpdating}
                />
            )}
            <Table
                config={createTableConfig({
                    reactTable: reactTable,
                    isLoading: isLoading ?? false,
                    noDataMessage: "Немає даних для відображення",
                    stickyHeader,
                })}
            />
            {showPagination && (
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
            )}
        </div>
    );
}
