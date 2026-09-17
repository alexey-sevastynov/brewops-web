import { ColumnDef } from "@tanstack/react-table";
import {
    createDateTableColumn,
    createTableColumn,
} from "@/shared/lib/react-table/column/create-table-column";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { formatDateToMonth } from "@/shared/utils/date";
import { User } from "@/modules/user/types/user";
import { userLabels } from "@/modules/user/constants/user-labels";
import { userProps } from "@/modules/user/constants/user-props";

export const userColumns: ColumnDef<User>[] = [
    createTableColumn({
        accessorKey: userProps.userName,
        header: userLabels.userName,
        meta: { label: userLabels.userName, resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: userProps.email,
        header: userLabels.email,
        meta: { label: userLabels.email, resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createTableColumn({
        accessorKey: userProps.phoneNumber,
        header: userLabels.phoneNumber,
        meta: { label: userLabels.phoneNumber, resourceFieldType: resourceFieldTypes.text, filterable: true },
    }),
    createDateTableColumn<User>({
        accessorKey: userProps.createdAt,
        header: userLabels.createdAt,
        formatter: formatDateToMonth,
    }),
    createDateTableColumn<User>({
        accessorKey: userProps.updatedAt,
        header: userLabels.updatedAt,
        formatter: formatDateToMonth,
    }),
];
