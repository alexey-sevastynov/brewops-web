import { ColumnDef } from "@tanstack/react-table";
import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";
import { createTableColumn } from "@/shared/lib/react-table/column/create-table-column";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { ResourceField } from "@/shared/types/resource-field";
import { BooleanCell } from "@/shared/ui/table/table-body/table-row/boolean-cell/BooleanCell";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";

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

import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";

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
