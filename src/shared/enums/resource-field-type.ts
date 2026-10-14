export const resourceFieldTypes = {
    text: "text",
    number: "number",
    checkbox: "checkbox",
    select: "select",
    textarea: "textarea",
    date: "date",
    password: "password",
} as const;

export type ResourceFieldType = (typeof resourceFieldTypes)[keyof typeof resourceFieldTypes];
