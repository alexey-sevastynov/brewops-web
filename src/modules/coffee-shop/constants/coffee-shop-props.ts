import { nameOf } from "@/shared/utils/name-of";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";

export const coffeeShopProps: Record<keyof CoffeeShop, string> = {
    _id: nameOf<CoffeeShop>("_id"),
    name: nameOf<CoffeeShop>("name"),
    address: nameOf<CoffeeShop>("address"),
    description: nameOf<CoffeeShop>("description"),
    isActive: nameOf<CoffeeShop>("isActive"),
    workspaceId: nameOf<CoffeeShop>("workspaceId"),
    telegramChatId: nameOf<CoffeeShop>("telegramChatId"),
    kavappEmail: nameOf<CoffeeShop>("kavappEmail"),
    kavappPassword: nameOf<CoffeeShop>("kavappPassword"),
    kavappPointId: nameOf<CoffeeShop>("kavappPointId"),
    createdAt: nameOf<CoffeeShop>("createdAt"),
    updatedAt: nameOf<CoffeeShop>("updatedAt"),
    workspace: nameOf<CoffeeShop>("workspace"),
    myAccess: nameOf<CoffeeShop>("myAccess"),
} as const;
