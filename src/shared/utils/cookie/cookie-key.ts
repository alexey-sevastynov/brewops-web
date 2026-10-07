export const cookieKeys = {
    token: "token",
    userName: "userName",
    isVerified: "isVerified",
    workspaceId: "workspaceId",
    coffeeShopId: "coffeeShopId",
    theme: "theme",
} as const;

export type CookieKey = (typeof cookieKeys)[keyof typeof cookieKeys];
