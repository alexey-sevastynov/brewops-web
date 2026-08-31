"use server";

import { CoffeeShopLayout } from "@/shared/layout/coffee-shop-layout/CoffeeShopLayout";
import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { getServerCookie } from "@/shared/utils/cookie/cookie-server";

interface CoffeeShopLayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: CoffeeShopLayoutProps) {
    const userName = await getServerCookie(cookieKeys.userName);
    const userRole = await getServerCookie(cookieKeys.userRole);
    const workspaceId = await getServerCookie(cookieKeys.workspaceId);

    return (
        <CoffeeShopLayout userName={userName} userRole={userRole} workspaceId={workspaceId ?? undefined}>
            {children}
        </CoffeeShopLayout>
    );
}
