import { ReactNode } from "react";
import { CellContext } from "@tanstack/react-table";
import { Link } from "@/shared/ui/link/Link";
import { LinkVariantKey, linkVariantKeys } from "@/shared/ui/link/link-variant-key";

interface LinkCellProps<TData> {
    cellInfo: CellContext<TData, unknown>;
    text?: ReactNode;
    variant?: LinkVariantKey;
    target?: string;
    rel?: string;
    className?: string;
}

export function LinkCell<TData>({
    cellInfo,
    text,
    variant = linkVariantKeys.primary,
    target = "_blank",
    rel = "noopener noreferrer",
    className,
}: LinkCellProps<TData>) {
    const value = cellInfo.getValue() as string | null | undefined;

    if (!value) return null;

    return (
        <div className={className} onClick={(e) => e.stopPropagation()}>
            <Link
                href={value}
                target={target}
                rel={rel}
                variant={variant}
                className="hover:underline"
            >
                {text ?? value}
            </Link>
        </div>
    );
}
