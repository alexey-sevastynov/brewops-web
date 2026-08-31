"use server";

import { AppLayout } from "@/shared/layout/app-layout/AppLayout";
import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { getServerCookie } from "@/shared/utils/cookie/cookie-server";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: AppLayoutProps) {
    const userName = await getServerCookie(cookieKeys.userName);
    const userRole = await getServerCookie(cookieKeys.userRole);
    const workspaceId = await getServerCookie(cookieKeys.workspaceId);

    if (!userName || !userRole) throw new Error("User data is missing.");

    return (
        <AppLayout userName={userName} userRole={userRole} workspaceId={workspaceId ?? undefined}>
            {children}
        </AppLayout>
    );
}
