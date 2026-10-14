import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { routeKeys } from "@/shared/constants/route-keys";

export function replaceRoute(router: AppRouterInstance, path: string) {
    const targetPath = path === routeKeys.home ? buildRoutePath(routeKeys.home) : path;

    router.replace(targetPath);
}

export function navigateTo(router: AppRouterInstance, path: string) {
    router.push(path);
}

export function buildRoutePath(first: string, ...rest: string[]) {
    if (first === routeKeys.home) return "/";

    const allSegments = [first, ...rest];
    const cleanedSegments = allSegments.map((s) => s.replace(/^\/|\/$/g, ""));
    const joinedPath = cleanedSegments.join("/");
    const finalPath = "/" + joinedPath;

    return finalPath;
}
