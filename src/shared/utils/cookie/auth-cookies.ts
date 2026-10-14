import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { removeCookie, setCookie } from "@/shared/utils/cookie/cookie-client";

const authCookieKeys = {
    token: cookieKeys.token,
    userName: cookieKeys.userName,
    isVerified: cookieKeys.isVerified,
    workspaceId: cookieKeys.workspaceId,
} as const;

export function setAuthCookies(token: string, userName: string, isVerified: boolean, workspaceId?: string) {
    setCookie(authCookieKeys.token, token);
    setCookie(authCookieKeys.userName, userName);
    setCookie(authCookieKeys.isVerified, String(isVerified));

    if (workspaceId) {
        setCookie(authCookieKeys.workspaceId, workspaceId);
    }
}

export function clearAuthCookies() {
    removeCookie(authCookieKeys.token);
    removeCookie(authCookieKeys.userName);
    removeCookie(authCookieKeys.isVerified);
    removeCookie(authCookieKeys.workspaceId);
    removeCookie(cookieKeys.coffeeShopId);
}
