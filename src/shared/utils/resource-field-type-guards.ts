import { ResourceFieldType, resourceFieldTypes } from "@/shared/enums/resource-field-type";

export function isInputFieldType(type: ResourceFieldType) {
    return type === resourceFieldTypes.text || type === resourceFieldTypes.number;
}

export function isCheckboxFieldType(type: ResourceFieldType) {
    return type === resourceFieldTypes.checkbox;
}

export function isEnumFieldType(type: ResourceFieldType) {
    return type === resourceFieldTypes.select;
}

export function isDateFieldType(type: ResourceFieldType) {
    return type === resourceFieldTypes.date;
}

export function isPasswordFieldType(type: ResourceFieldType) {
    return type === resourceFieldTypes.password;
}
