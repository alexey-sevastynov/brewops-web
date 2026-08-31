"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Button } from "@/shared/ui/button/Button";
import { routeKeys } from "@/shared/constants/route-keys";

interface CoffeeShopContextGateProps {
    children: React.ReactNode;
}

export function CoffeeShopContextGate({ children }: CoffeeShopContextGateProps) {
    const router = useRouter();
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const coffeeShopId = useAppSelector((state) => state.coffeeShop.selectedCoffeeShopId);
    const isLoadingWorkspaces = useAppSelector((state) => state.workspace.isLoading);
    const isLoadingCoffeeShops = useAppSelector((state) => state.coffeeShop.isLoading);

    if (isLoadingWorkspaces || isLoadingCoffeeShops || !workspaceId) {
        return <div className="border-border rounded-xl border p-6">Завантаження контексту...</div>;
    }

    if (!coffeeShopId) {
        return (
            <section className="border-border mx-auto mt-12 max-w-2xl rounded-2xl border p-8 text-center">
                <p className="text-muted-foreground text-sm font-medium tracking-widest">BREWOPS</p>
                <h1 className="mt-3 text-3xl font-semibold">Створіть першу кавʼярню</h1>
                <p className="text-muted-foreground mx-auto mt-3 max-w-lg">
                    У вибраному workspace ще немає кавʼярень. Створіть локацію, щоб перейти до звітів,
                    працівників та статистики.
                </p>
                <Button
                    className="mx-auto mt-6"
                    text="Створити кавʼярню"
                    onClick={() => router.push(routeKeys.workspaceSettings)}
                />
            </section>
        );
    }

    return <div key={coffeeShopId} className="contents">{children}</div>;
}
