import axios, { isAxiosError } from "axios";
import { getStringEnv } from "@/shared/infra/env/env-functions";
import { envKeys } from "@/shared/infra/env/env-keys";
import { endpoints } from "@/shared/infra/config/endpoints";
import { getCookie } from "@/shared/utils/cookie/cookie-client";
import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { clearAuthCookies } from "@/shared/utils/cookie/auth-cookies";
import { routeKeys } from "@/shared/constants/route-keys";

const apiModeKeys = {
    local: "local",
    remote: "remote",
} as const;

const publicApiPaths = [
    "/auth/signin",
    "/auth/signup",
    "/password-reset",
    "/mail-verification",
] as const;

export const apiClient = axios.create({
    baseURL: getApiBaseUrl(),
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const token = getCookie(cookieKeys.token);
    const coffeeShopId = getCookie(cookieKeys.coffeeShopId);
    const requestUrl = String(config.url ?? "");

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    // Rewrite endpoints that scope by coffeeShopId
    if (requestUrl.startsWith("/coffee-shop/") && coffeeShopId) {
        config.url = requestUrl.replace(/^\/coffee-shop\//, `/coffee-shops/${coffeeShopId}/`);
    } else if (requestUrl === "/coffee-shop" && coffeeShopId) {
        config.url = `/coffee-shops/${coffeeShopId}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        if (!isAxiosError(error)) {
            return Promise.reject(error);
        }

        const statusCode = error.response?.status;
        const requestUrl = String(error.config?.url ?? "");
        const isPublicApiRequest = publicApiPaths.some((path) => requestUrl.includes(path));

        if (statusCode === 401 && !isPublicApiRequest) {
            clearAuthCookies();

            if (typeof window !== "undefined" && !window.location.pathname.startsWith(routeKeys.signIn)) {
                window.location.href = routeKeys.signIn;
            }
        }

        return Promise.reject(error);
    },
);

function getApiBaseUrl() {
    const apiMode = getStringEnv(envKeys.nextPublicApiMode);

    if (apiMode === apiModeKeys.local) {
        return endpoints.localhost;
    }

    return endpoints.remoteApi;
}
