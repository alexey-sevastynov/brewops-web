import { RootState } from "@/store";

export const selectCurrentWorkspace = (state: RootState) =>
    state.workspace.workspaces.find((workspace) => workspace._id === state.workspace.selectedWorkspaceId);

export const selectWorkspaceByCoffeeShopId = (state: RootState, coffeeShopId: string | null) => {
    const coffeeShop = state.coffeeShop.coffeeShops.find((shop) => shop._id === coffeeShopId);
    const workspaceId = coffeeShop?.workspaceId ?? state.workspace.selectedWorkspaceId;

    return state.workspace.workspaces.find((workspace) => workspace._id === workspaceId);
};
