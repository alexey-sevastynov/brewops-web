import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { parseInputFieldValue } from "@/shared/ui/form/resource-form-modal/resource-form/resource-input-field/resourceInputField.funcs";
import { ResourceField } from "@/shared/types/resource-field";
import { MRInput } from "@/shared/ui/input/Input";

interface ResourceInputFieldProps<T extends FieldValues> {
    field: ResourceField<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
}

export function ResourceInputField<T extends FieldValues>({
    field,
    control,
    errors,
}: ResourceInputFieldProps<T>) {
    const errorMessage = errors[field.name]?.message as string;

    return (
        <Controller
            name={field.name}
            control={control}
            rules={{
                required: field.required ? `${field.label} обов'язкове поле` : undefined,
            }}
            render={(controllerFieldState) => (
                <div>
                    <MRInput
                        label={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        value={controllerFieldState.field.value ?? ""}
                        onChange={(e) =>
                            controllerFieldState.field.onChange(
                                parseInputFieldValue(field.type, e.target.value),
                            )
                        }
                    />
                    {errorMessage && <p className="text-destructive mt-1 text-sm">{errorMessage}</p>}
                </div>
            )}
        />
    );
}
