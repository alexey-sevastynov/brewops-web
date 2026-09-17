import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { appToast } from "@/shared/lib/toast";
import { getCoffeeShops } from "@/modules/coffee-shop/model/coffee-shop-thunks";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { setSelectedWorkspaceId } from "@/modules/workspace/model/workspace-slice";
import { getWorkspaces } from "@/modules/workspace/model/workspace-thunks";
import { Workspace } from "@/modules/workspace/types/workspace";

interface InitializeWorkspaceResult {
    workspaces: Workspace[];
    selectedWorkspaceId: string | null;
    coffeeShops: CoffeeShop[];
    isLoading: boolean;
}

export function useInitializeWorkspace(): InitializeWorkspaceResult {
    const dispatch = useAppDispatch();

    const workspaces = useAppSelector((state) => state.workspace.workspaces);
    const selectedWorkspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const workspaceLoading = useAppSelector((state) => state.workspace.isLoading);
    const workspaceError = useAppSelector((state) => state.workspace.error);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const coffeeShopLoading = useAppSelector((state) => state.coffeeShop.isLoading);
    const coffeeShopError = useAppSelector((state) => state.coffeeShop.error);

    useEffect(() => {
        dispatch(getWorkspaces());
    }, [dispatch]);

    useEffect(() => {
        if (workspaces.length === 0 || selectedWorkspaceId) return;

        dispatch(setSelectedWorkspaceId(workspaces[0]._id));
    }, [dispatch, workspaces, selectedWorkspaceId]);

    useEffect(() => {
        if (!selectedWorkspaceId) return;

        dispatch(getCoffeeShops(selectedWorkspaceId));
    }, [dispatch, selectedWorkspaceId]);

    useEffect(() => {
        if (workspaceError) {
            appToast.error(workspaceError.message || "Не вдалося завантажити workspace");
        }
    }, [workspaceError]);

    useEffect(() => {
        if (coffeeShopError) {
            appToast.error(coffeeShopError.message || "Не вдалося завантажити кавʼярні");
        }
    }, [coffeeShopError]);

    return {
        workspaces,
        selectedWorkspaceId,
        coffeeShops,
        isLoading: workspaceLoading || coffeeShopLoading,
    };
}
