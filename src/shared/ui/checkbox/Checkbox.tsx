"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { ReactNode, useId } from "react";
import { cn } from "@/shared/lib/cn";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label?: ReactNode;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
    const generatedId: string = useId();

    return (
        <div className="flex items-center gap-2">
            <CheckboxPrimitive.Root
                id={generatedId}
                className={cn(
                    "cursor-pointer",
                    "border-primary h-4 w-4 shrink-0 rounded-sm border",
                    "flex items-center justify-center",
                    "focus-visible:ring-ring focus-visible:ring-2",
                    "focus-visible:ring-offset-2 focus-visible:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                    className,
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                    <Check className="h-3 w-3" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>

            {label && (
                <label
                    htmlFor={generatedId}
                    className="text-muted-foreground cursor-pointer leading-none font-medium"
                >
                    {label}
                </label>
            )}
        </div>
    );
}
