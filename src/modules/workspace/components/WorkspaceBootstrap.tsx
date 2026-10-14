"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { clearAuthCookies } from "@/shared/utils/cookie/auth-cookies";
import { routeKeys } from "@/shared/constants/route-keys";
import { getCoffeeShops } from "@/modules/coffee-shop/model/coffee-shop-thunks";
import { WorkspaceLoader } from "@/modules/workspace/components/WorkspaceLoader";
import { setSelectedWorkspaceId } from "@/modules/workspace/model/workspace-slice";
import { signOut } from "@/modules/auth/model/slice";
import { getWorkspaces } from "@/modules/workspace/model/workspace-thunks";

const statusMessages = {
    workspaces: "Синхронізуємо робочі простори…",
    coffeeShops: "Готуємо меню дня…",
    ready: "Майже готово…",
};

export function WorkspaceBootstrap({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(statusMessages.workspaces);
    const [isReady, setIsReady] = useState(false);
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;

        startedRef.current = true;

        const bootstrap = async () => {
            try {
                setProgress(18);
                const workspaces = await dispatch(getWorkspaces()).unwrap();
                const workspaceId = workspaces[0]?._id ?? null;

                if (!workspaceId || workspaces.length === 0) {
                    dispatch(signOut());
                    clearAuthCookies();
                    window.location.href = routeKeys.signIn;
                    return;
                }

                dispatch(setSelectedWorkspaceId(workspaceId));
                setProgress(52);

                setStatus(statusMessages.coffeeShops);

                await dispatch(getCoffeeShops(workspaceId)).unwrap();

                setStatus(statusMessages.ready);
                setProgress(100);
                window.setTimeout(() => setIsReady(true), 350);
            } catch {
                dispatch(signOut());
                clearAuthCookies();
                window.location.href = routeKeys.signIn;
            }
        };

        void bootstrap();
    }, [dispatch]);

    if (isReady) return children;

    return <WorkspaceLoader progress={progress} status={status} />;
}
