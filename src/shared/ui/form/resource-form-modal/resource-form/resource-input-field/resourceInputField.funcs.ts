import { ResourceFieldType, resourceFieldTypes } from "@/shared/enums/resource-field-type";

export function parseInputFieldValue(type: ResourceFieldType, value: string) {
    if (!isNumberFieldType(type)) return value;

    if (value === "") return "";

    const parsedNumber = Number(value);

    return Number.isFinite(parsedNumber) ? parsedNumber : "";
}

function isNumberFieldType(type: ResourceFieldType) {
    return type === resourceFieldTypes.number;
}
