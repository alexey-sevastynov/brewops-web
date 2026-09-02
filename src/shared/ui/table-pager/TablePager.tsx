import { cn } from "@/shared/lib/cn";
import { PageInfo } from "@/shared/ui/table-pager/page-info/PageInfo";
import { PaginationControls } from "@/shared/ui/table-pager/pagination-controls/PaginationControls";
import { PageSizeSelector } from "@/shared/ui/table-pager/page-size-selector/PageSizeSelector";
import { VoidFunc } from "@/shared/types/getter-setter-functions";

interface TablePagerProps {
    currentPage: number;
    pageSize: number;
    totalRows: number;
    pageSizeOptions: number[];
    pageCount: number;
    canNext: boolean;
    canPrevious: boolean;
    onPageChange: VoidFunc<number>;
    onPageSizeChange: VoidFunc<number>;
    className?: string;
}

export function TablePager(props: TablePagerProps) {
    const {
        className,
        currentPage,
        pageSize,
        totalRows,
        pageSizeOptions,
        pageCount,
        canNext,
        canPrevious,
        onPageChange,
        onPageSizeChange,
    } = props;

    const hasData = totalRows > 0;

    if (!hasData) {
        return null;
    }

    return (
        <div
            className={cn(
                "mt-4 flex flex-col gap-3 rounded-lg px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6",
                "bg-background text-foreground",
                className,
            )}
        >
            <div className="flex items-center gap-4">
                <PageInfo currentPage={currentPage} pageSize={pageSize} totalRows={totalRows} />
                <PageSizeSelector
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeOptions}
                    onPageSizeChange={onPageSizeChange}
                />
            </div>
            <PaginationControls
                currentPage={currentPage}
                pageCount={pageCount}
                canNext={canNext}
                canPrevious={canPrevious}
                onPageChange={onPageChange}
            />
        </div>
    );
}
