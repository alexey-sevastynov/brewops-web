import { ColumnDef } from "@tanstack/react-table";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { ResourceField } from "@/shared/types/resource-field";
import { BooleanCell } from "@/shared/ui/table/table-body/table-row/boolean-cell/BooleanCell";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";

export const coffeeShopColumns: ColumnDef<CoffeeShop>[] = [
    createTableColumn({
        accessorKey: "name",
        header: "Назва",
        meta: { label: "Назва", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "address",
        header: "Адреса",
        meta: { label: "Адреса", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "description",
        header: "Опис",
        meta: { label: "Опис", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "isActive",
        header: "Активна",
        cell: (cellInfo) => <BooleanCell cellInfo={cellInfo} />,
        meta: { label: "Активна", resourceFieldType: resourceFieldTypes.checkbox, filterable: true },
    }),
    createTableColumn({
        accessorKey: "kavappEmail",
        header: "Kavapp Email",
        meta: { label: "Kavapp Email", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "kavappPassword",
        header: "Kavapp Пароль",
        meta: { label: "Kavapp Пароль", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: "kavappPointId",
        header: "Kavapp Point ID",
        meta: { label: "Kavapp Point ID", resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
];

export const coffeeShopFormFields: ResourceField<CoffeeShop>[] = [
    { name: "name", label: "Назва", type: resourceFieldTypes.text, required: true },
    { name: "address", label: "Адреса", type: resourceFieldTypes.text },
    { name: "description", label: "Опис", type: resourceFieldTypes.text },
    {
        name: "kavappEmail",
        label: "Kavapp Email",
        type: resourceFieldTypes.text,
        placeholder: "email@kavapp.com",
    },
    {
        name: "kavappPassword",
        label: "Kavapp Пароль",
        type: resourceFieldTypes.password,
        placeholder: "••••••••",
    },
    {
        name: "kavappPointId",
        label: "Kavapp Point ID",
        type: resourceFieldTypes.text,
        placeholder: "ID торгової точки",
    },
];

export function createCoffeeShopActionsColumn(
    onDelete: (id: string) => void,
    onEdit: (item: CoffeeShop) => void,
) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button iconName={iconNames.edit} onClick={() => onEdit(row.original)} />
                <Button
                    iconName={iconNames.trash}
                    variant={buttonVariantKeys.danger}
                    onClick={() => onDelete(row.original._id)}
                />
            </div>
        ),
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<CoffeeShop>;
}
