import { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { VoidFuncNoParam } from "@/shared/types/getter-setter-functions";

interface CardProps {
    children: ReactNode;
    className?: string;
    isActive?: boolean;
    onClick?: VoidFuncNoParam;
    tabIndex?: number;
}

export function Card({ children, className, isActive = false, onClick, tabIndex = 0 }: CardProps) {
    return (
        <div
            className={cn(
                "relative rounded-xl border p-4 shadow-sm",
                isActive && "border-primary",
                onClick && "cursor-pointer transition hover:shadow-md",
                className,
            )}
            onClick={onClick}
            tabIndex={tabIndex}
        >
            {children}
        </div>
    );
}
