"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { FloatingLabel } from "@/shared/ui/input/FloatingLabel";

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface MRSelectProps
    extends Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, "value" | "onValueChange"> {
    label?: string;
    options: SelectOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function Select({
    label,
    options,
    value: externalValue,
    onValueChange,
    className,
    ...props
}: MRSelectProps) {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(externalValue);

    return (
        <div className="relative h-12 w-full">
            <SelectPrimitive.Root value={externalValue} onValueChange={onValueChange} {...props}>
                <SelectPrimitive.Trigger
                    className={cn(
                        "peer flex h-full w-full items-center justify-between",
                        "rounded-xl border",
                        "px-4",
                        "text-foreground border-border bg-[color:var(--color-input)]",
                        "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none",
                        "placeholder:text-muted-foreground transition-colors duration-200",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <span className="mr-2 w-full truncate text-left">
                        <SelectPrimitive.Value />
                    </span>
                    <SelectPrimitive.Icon>
                        <ChevronDown className="h-4 w-4" />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>

                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        className={cn(
                            "z-50 overflow-hidden rounded-md border shadow-lg",
                            "bg-popover text-popover-foreground border-border",
                        )}
                    >
                        <SelectPrimitive.ScrollUpButton className="text-muted-foreground flex h-6 items-center justify-center">
                            <ChevronUp className="h-4 w-4" />
                        </SelectPrimitive.ScrollUpButton>

                        <SelectPrimitive.Viewport className="p-1">
                            {options.map((opt) => (
                                <SelectPrimitive.Item
                                    key={opt.value}
                                    value={opt.value}
                                    disabled={opt.disabled}
                                    className={cn(
                                        "relative flex items-center",
                                        "cursor-pointer select-none",
                                        "rounded-md px-3 py-2",
                                        "text-sm",
                                        "focus:bg-primary focus:text-primary-foreground",
                                        "data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground",
                                        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

                                        className,
                                    )}
                                >
                                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>

                        <SelectPrimitive.ScrollDownButton className="text-muted-foreground flex h-6 items-center justify-center">
                            <ChevronDown className="h-4 w-4" />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>

            {label && <FloatingLabel label={label} isFocused={isFocused} hasValue={hasValue} />}
        </div>
    );
}
