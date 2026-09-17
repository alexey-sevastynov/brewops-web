import { ColumnDef } from "@tanstack/react-table";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { isAdminRole, isOwnerRole } from "@/modules/workspace/utils/guards";

interface CoffeeShopActionsCellProps {
    coffeeShop: CoffeeShop;
    onDelete: VoidFunc<string>;
    onEdit: VoidFunc<CoffeeShop>;
}

export function createCoffeeShopActionsColumn(onDelete: VoidFunc<string>, onEdit: VoidFunc<CoffeeShop>) {
    return {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => (
            <CoffeeShopActionsCell coffeeShop={row.original} onDelete={onDelete} onEdit={onEdit} />
        ),
        size: 120,
        enableSorting: false,
        enableResizing: false,
        enableHiding: false,
    } satisfies ColumnDef<CoffeeShop>;
}

function CoffeeShopActionsCell({ coffeeShop, onDelete, onEdit }: CoffeeShopActionsCellProps) {
    const isOwner = coffeeShop.myAccess?.isOwner ?? isOwnerRole(coffeeShop.myAccess?.role);

    const canEdit = isOwner || isAdminRole(coffeeShop.myAccess?.role);
    const canDelete = isOwner;

    if (!canEdit && !canDelete) {
        return null;
    }

    return (
        <div className="flex gap-2">
            {canEdit && <Button iconName={iconNames.edit} onClick={() => onEdit(coffeeShop)} />}
            {canDelete && (
                <Button
                    iconName={iconNames.trash}
                    variant={buttonVariantKeys.danger}
                    onClick={() => onDelete(coffeeShop._id)}
                />
            )}
        </div>
    );
}
