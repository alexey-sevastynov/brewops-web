"use server";

import { AppLayout } from "@/shared/layout/app-layout/AppLayout";
import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { getServerCookie } from "@/shared/utils/cookie/cookie-server";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: ProtectedLayoutProps) {
    const userName = await getServerCookie(cookieKeys.userName);

    if (!userName) throw new Error("User data is missing.");

    return <AppLayout userName={userName}>{children}</AppLayout>;
}
