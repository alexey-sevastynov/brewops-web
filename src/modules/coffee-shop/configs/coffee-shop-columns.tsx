import { ColumnDef } from "@tanstack/react-table";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import {
    createDateTableColumn,
    createTableColumn,
} from "@/shared/lib/react-table/column/create-table-column";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { coffeeShopProps } from "@/modules/coffee-shop/constants/coffee-shop-props";
import { coffeeShopLabels } from "@/modules/coffee-shop/constants/coffee-shop-labels";
import { getWorkspaceRoleBadge } from "@/modules/workspace/configs/workspace-member-columns";

export const coffeeShopColumns: ColumnDef<CoffeeShop>[] = [
    createTableColumn({
        accessorKey: coffeeShopProps.name,
        header: coffeeShopLabels.name,
        meta: { label: coffeeShopLabels.name, resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: coffeeShopProps.address,
        header: coffeeShopLabels.address,
        meta: {
            label: coffeeShopLabels.address,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn({
        accessorKey: coffeeShopProps.myAccess,
        header: coffeeShopLabels.myAccess,
        cell: ({ row }) => getWorkspaceRoleBadge(row.original.myAccess?.role),
        meta: {
            label: coffeeShopLabels.myAccess,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createTableColumn({
        accessorKey: coffeeShopProps.workspace,
        header: coffeeShopLabels.workspace,
        cell: ({ row }) => row.original.workspace?.name,
        meta: {
            label: coffeeShopLabels.myAccess,
            resourceFieldType: resourceFieldTypes.text,
            filterable: true,
        },
    }),
    createDateTableColumn<CoffeeShop>({
        accessorKey: coffeeShopProps.createdAt,
        header: coffeeShopLabels.createdAt,
    }),
];
