import { useRef } from "react";
import { cn } from "@/shared/lib/cn";
import { TableBody } from "@/shared/ui/table/table-body/TableBody";
import { TableHeader } from "@/shared/ui/table/table-header/TableHeader";
import { TableFooter } from "@/shared/ui/table/table-footer/TableFooter";
import { TableConfig } from "@/shared/lib/react-table/table-config";
import { useSyncScroll } from "@/shared/ui/table/use-sync-scroll";
import { useSyncColumnWidths } from "@/shared/ui/table/use-sync-column-widths";
import { StickyHeader } from "@/shared/ui/table/table-header/StickyHeader";

export interface TableProps<TData> {
    config: TableConfig<TData>;
}

export function Table<TData>({ config }: TableProps<TData>) {
    const headScrollRef = useRef<HTMLDivElement>(null);
    const headTableRef = useRef<HTMLTableElement>(null);
    const bodyTableRef = useRef<HTMLTableElement>(null);

    const onScroll = useSyncScroll(headScrollRef);

    useSyncColumnWidths({
        enabled: config.stickyHeader ?? false,
        headTableRef,
        bodyTableRef,
        data: config.reactTable.getRowModel().rows,
    });

    return (
        <div className="relative w-full max-w-full">
            {config.stickyHeader && (
                <StickyHeader config={config} headScrollRef={headScrollRef} headTableRef={headTableRef} />
            )}

            <div
                className={cn(
                    "bg-background w-full overflow-auto shadow-xs",
                    config.stickyHeader
                        ? "border-border rounded-b-lg border-x border-b"
                        : "border-border rounded-lg border",
                )}
                onScroll={config.stickyHeader ? onScroll : undefined}
            >
                <div className="inline-block min-w-full align-middle">
                    <table
                        ref={bodyTableRef}
                        className="border-border relative w-full divide-y"
                        style={{ minWidth: config.reactTable.getCenterTotalSize() }}
                    >
                        {!config.stickyHeader && (
                            <TableHeader
                                reactTable={config.reactTable}
                                enableSorting={config.enableSorting}
                                enableColumnResizing={config.enableResizing}
                                isSticky={false}
                            />
                        )}

                        <TableBody
                            reactTable={config.reactTable}
                            noDataMessage={config.noDataMessage}
                            isLoading={config.isLoading}
                            onRowClick={config.onRowClick}
                        />

                        {config.enableTableFooter && <TableFooter reactTable={config.reactTable} />}
                    </table>
                </div>
            </div>
        </div>
    );
}
