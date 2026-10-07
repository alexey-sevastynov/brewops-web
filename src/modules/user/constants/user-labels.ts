import { User } from "@/modules/user/types/user";

export const userLabels: Record<keyof User, string> = {
    _id: "Id",
    userId: "Id користувача",
    userName: "Ім'я користувача",
    email: "Email",
    password: "Пароль",
    userStatus: "Статус",
    isVerified: "Верифікація",
    blockReason: "Причина блоку",
    firstName: "Ім'я",
    lastName: "Прізвище",
    phoneNumber: "Номер телефону",
    createdAt: "Створено",
    updatedAt: "Оновлено",
} as const;
