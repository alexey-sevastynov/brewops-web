"use server";

import { AppLayout } from "@/shared/layout/app-layout/AppLayout";
import { cookieKeys } from "@/shared/utils/cookie/cookie-key";
import { getServerCookie } from "@/shared/utils/cookie/cookie-server";
import { userErrorMessages } from "@/modules/user/constants/error-messages";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default async function Layout({ children }: ProtectedLayoutProps) {
    const userName = await getServerCookie(cookieKeys.userName);

    if (!userName) throw new Error(userErrorMessages.missingUserData);

    return <AppLayout userName={userName}>{children}</AppLayout>;
}
