import { RootState } from "@/store";

export const selectCoffeeShopById = (state: RootState, coffeeShopId: string | undefined) =>
    findCoffeeShopById(state, coffeeShopId);

export const selectWorkspaceByCoffeeShopId = (state: RootState, coffeeShopId: string) => {
    const coffeeShop = findCoffeeShopById(state, coffeeShopId);

    if (!coffeeShop) return undefined;

    return state.workspace.workspaces.find((workspace) => workspace._id === coffeeShop.workspaceId);
};

function findCoffeeShopById(state: RootState, coffeeShopId: string | undefined) {
    return state.coffeeShop.coffeeShops.find((coffeeShop) => coffeeShop._id === coffeeShopId);
}
