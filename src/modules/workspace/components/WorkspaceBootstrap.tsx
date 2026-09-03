"use client";

import { useEffect, useRef, useState } from "react";
import { getCoffeeShops } from "@/modules/coffee-shop/coffee-shop-thunks";
import { WorkspaceLoader } from "@/modules/workspace/components/WorkspaceLoader";
import { setSelectedWorkspaceId } from "@/modules/workspace/workspace-slice";
import { getWorkspaces } from "@/modules/workspace/workspace-thunks";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";

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

                dispatch(setSelectedWorkspaceId(workspaceId));
                setProgress(52);

                if (workspaceId) {
                    setStatus(statusMessages.coffeeShops);

                    await dispatch(getCoffeeShops(workspaceId)).unwrap();
                }

                setStatus(statusMessages.ready);
                setProgress(100);
            } catch {
                setProgress(100);
                setStatus(statusMessages.ready);
            } finally {
                window.setTimeout(() => setIsReady(true), 350);
            }
        };

        void bootstrap();
    }, [dispatch]);

    if (isReady) return children;

    return <WorkspaceLoader progress={progress} status={status} />;
}
