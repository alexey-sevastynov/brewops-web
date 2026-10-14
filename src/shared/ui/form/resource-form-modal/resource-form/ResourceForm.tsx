"use client";

import { useForm, DefaultValues, FieldValues } from "react-hook-form";
import { Button } from "@/shared/ui/button/Button";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import {
    isCheckboxFieldType,
    isDateFieldType,
    isEnumFieldType,
    isInputFieldType,
    isPasswordFieldType,
} from "@/shared/utils/resource-field-type-guards";
import { ResourceInputField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-input-field/ResourceInputField";
import { ResourceCheckboxField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-checkbox-field/ResourceCheckboxField";
import { ResourceSelectField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-select-field/ResourceSelectField";
import { ResourceField } from "@/shared/types/resource-field";
import { ResourceDateField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-date-field/ResourceDateField";
import { ResourcePasswordField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-password-field/ResourcePasswordField";

interface ResourceFormProps<T extends FieldValues> {
    fields: ResourceField<T>[];
    defaultValues?: DefaultValues<T>;
    onSubmit: VoidFunc<T>;
    submitLabel?: string;
    loading?: boolean;
}

export function ResourceForm<T extends FieldValues>({
    fields,
    defaultValues,
    onSubmit,
    submitLabel = "Зберегти",
    loading,
}: ResourceFormProps<T>) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<T>({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => {
                if (isInputFieldType(field.type)) {
                    return (
                        <ResourceInputField
                            key={field.name}
                            field={field}
                            control={control}
                            errors={errors}
                        />
                    );
                }

                if (isCheckboxFieldType(field.type)) {
                    return (
                        <ResourceCheckboxField
                            key={field.name}
                            field={field}
                            control={control}
                            errors={errors}
                        />
                    );
                }

                if (isEnumFieldType(field.type)) {
                    return (
                        <ResourceSelectField
                            key={field.name}
                            field={field}
                            control={control}
                            errors={errors}
                        />
                    );
                }

                if (isDateFieldType(field.type)) {
                    return (
                        <ResourceDateField key={field.name} field={field} control={control} errors={errors} />
                    );
                }

                if (isPasswordFieldType(field.type)) {
                    return (
                        <ResourcePasswordField
                            key={field.name}
                            field={field}
                            control={control}
                            errors={errors}
                        />
                    );
                }
            })}

            <Button text={submitLabel} type="submit" loading={loading} />
        </form>
    );
}
