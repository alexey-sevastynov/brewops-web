import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { ResourceName } from "@/shared/constants/resource-names";
import { permissionActions } from "@/shared/enums/permission-action";
import { isOwnerOrAdminRole } from "@/modules/workspace/utils/guards";
import { Workspace } from "@/modules/workspace/types/workspace";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import {
    selectCoffeeShopById,
    selectWorkspaceByCoffeeShopId,
} from "@/modules/coffee-shop/model/coffee-shop-selectors";
import { CoffeeShopResourcePermissions } from "@/modules/coffee-shop/types/сoffee-shop-resource-permissions";

export function useCoffeeShopResourcePermissions(coffeeShopId: string, resourceKey: ResourceName) {
    const coffeeShop = useAppSelector((state) => selectCoffeeShopById(state, coffeeShopId));
    const shopWorkspace = useAppSelector((state) => selectWorkspaceByCoffeeShopId(state, coffeeShopId));

    if (!coffeeShop) return getNoPermissions();

    const permissions = getCoffeeShopPermissions(coffeeShop, resourceKey, shopWorkspace);

    return permissions;
}

function isWorkspaceOwnerOrAdmin(workspace?: Workspace) {
    if (!workspace) return false;

    return workspace.isOwner || isOwnerOrAdminRole(workspace.role);
}

function isCoffeeShopOwnerOrAdmin(coffeeShop: CoffeeShop) {
    if (!coffeeShop.myAccess) return false;

    return coffeeShop.myAccess.isOwner || isOwnerOrAdminRole(coffeeShop.myAccess.role);
}

function hasPermission(permissions: string[], resourceKey: ResourceName, action: string) {
    return (
        permissions.includes("*:*") ||
        permissions.includes(resourceKey) ||
        permissions.includes(`${resourceKey}:${action}`)
    );
}

function getPermissionResult(permissions: string[], resourceKey: ResourceName) {
    const canWrite = hasPermission(permissions, resourceKey, permissionActions.write);
    const canDelete = hasPermission(permissions, resourceKey, permissionActions.delete);
    const canRead = canWrite || canDelete || hasPermission(permissions, resourceKey, permissionActions.read);

    const coffeeShopResourcePermissions: CoffeeShopResourcePermissions = {
        canRead,
        canWrite,
        canDelete,
        isOwnerOrAdmin: false,
    };

    return coffeeShopResourcePermissions;
}

function getOwnerOrAdminPermissions() {
    const coffeeShopResourcePermissions: CoffeeShopResourcePermissions = {
        canRead: true,
        canWrite: true,
        canDelete: true,
        isOwnerOrAdmin: true,
    };

    return coffeeShopResourcePermissions;
}

function getNoPermissions() {
    const coffeeShopResourcePermissions: CoffeeShopResourcePermissions = {
        canRead: false,
        canWrite: false,
        canDelete: false,
        isOwnerOrAdmin: false,
    };

    return coffeeShopResourcePermissions;
}

function getCoffeeShopPermissions(coffeeShop: CoffeeShop, resourceKey: ResourceName, workspace?: Workspace) {
    const workspaceOwnerOrAdmin = isWorkspaceOwnerOrAdmin(workspace);
    const coffeeShopOwnerOrAdmin = isCoffeeShopOwnerOrAdmin(coffeeShop);

    const ownerOrAdmin = workspaceOwnerOrAdmin || coffeeShopOwnerOrAdmin;

    if (ownerOrAdmin) {
        return getOwnerOrAdminPermissions();
    }

    return getPermissionResult(coffeeShop.myAccess.permissions, resourceKey);
}
