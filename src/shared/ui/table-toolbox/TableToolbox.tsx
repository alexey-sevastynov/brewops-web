import { Table } from "@tanstack/react-table";
import { TableColumnVisibilityDropdown } from "@/shared/ui/table-toolbox/table-column-visibility-dropdown/TableColumnVisibilityDropdown";
import { TableFilterDropdown } from "@/shared/ui/table-toolbox/table-filter-dropdown/TableFilterDropdown";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/shared/ui/dropdown/Dropdown";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { iconColors } from "@/shared/ui/icon/icon-color";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { exportTableToExcel } from "@/shared/lib/react-table/export/export-table-to-excel";

interface TableToolboxProps<TData> {
    reactTable: Table<TData>;
    children?: React.ReactNode;
}

export function TableToolbox<TData>({ reactTable, children }: TableToolboxProps<TData>) {
    const columns = reactTable.getAllColumns();
    const hasData = reactTable.getFilteredRowModel().rows.length > 0;

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            {hasData && (
                <div className="flex flex-wrap items-center gap-3">
                    <TableFilterDropdown columns={columns} />
                    <TableColumnVisibilityDropdown columns={columns} />
                </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
                {hasData && (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                text="Экспорт"
                                iconName={iconNames.download}
                                iconColor={iconColors.primary}
                                variant={buttonVariantKeys.secondary}
                            />
                        </DropdownTrigger>
                        <DropdownContent>
                            <DropdownItem
                                onSelect={() => {
                                    exportTableToExcel({
                                        table: reactTable,
                                        fileName: reactTable.options.meta?.exportFileName ?? "table-export",
                                        sheetName: reactTable.options.meta?.exportSheetName ?? "Sheet1",
                                        excludedColumns: ["actions", "id", "createdAt", "updatedAt"],
                                    });
                                }}
                            >
                                Експорт в Excel
                            </DropdownItem>
                        </DropdownContent>
                    </Dropdown>
                )}
                {children}
            </div>
        </div>
    );
}
