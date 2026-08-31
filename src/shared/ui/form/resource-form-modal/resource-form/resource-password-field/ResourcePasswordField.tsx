"use client";

import { useState } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { ResourceField } from "@/shared/types/resource-field";
import { MRInput } from "@/shared/ui/input/Input";
import { Icon } from "@/shared/ui/icon/Icon";
import { iconNames } from "@/shared/ui/icon/icon-name";

interface ResourcePasswordFieldProps<T extends FieldValues> {
    field: ResourceField<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
}

export function ResourcePasswordField<T extends FieldValues>({
    field,
    control,
    errors,
}: ResourcePasswordFieldProps<T>) {
    const [isVisible, setIsVisible] = useState(false);
    const errorMessage = errors[field.name]?.message as string;

    return (
        <Controller
            name={field.name}
            control={control}
            rules={{
                required: field.required ? `${field.label} обов'язкове поле` : undefined,
            }}
            render={(controllerFieldState) => (
                <div className="relative">
                    <MRInput
                        label={field.label}
                        type={isVisible ? "text" : "password"}
                        placeholder={field.placeholder ?? "••••••••"}
                        value={controllerFieldState.field.value ?? ""}
                        onChange={(e) => controllerFieldState.field.onChange(e.target.value)}
                        className="pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setIsVisible((prev) => !prev)}
                        className="absolute top-6 right-3 -translate-y-1/2"
                        tabIndex={-1}
                        aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
                    >
                        <Icon
                            name={isVisible ? iconNames.eyeOff : iconNames.eye}
                            className="cursor-pointer"
                        />
                    </button>
                    {errorMessage && <p className="text-destructive mt-1 text-sm">{errorMessage}</p>}
                </div>
            )}
        />
    );
}
