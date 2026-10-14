import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";

export const coffeeShopLabels: Record<keyof CoffeeShop, string> = {
    _id: "Id",
    name: "Назва",
    address: "Адреса",
    description: "Опис",
    isActive: "Статус",
    workspaceId: "Workspace Id",
    telegramChatId: "Telegram Chat ID",
    kavappEmail: "Kavapp Email",
    kavappPassword: "Kavapp Пароль",
    kavappPointId: "Kavapp Point ID",
    createdAt: "Створено",
    updatedAt: "Оновлено",
    workspace: "Робочий простір",
    myAccess: "Роль",
} as const;
