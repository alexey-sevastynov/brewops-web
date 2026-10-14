"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { routeKeys } from "@/shared/constants/route-keys";
import { Select } from "@/shared/ui/select/Select";
import { formatDateToDateTime } from "@/shared/utils/date";
import { Text } from "@/shared/ui/typography/text/Text";
import { navigateTo } from "@/shared/utils/navigation";
import { VoidFuncNoParam } from "@/shared/types/getter-setter-functions";

interface KavappInventoryHeaderProps {
    lastSyncDate: string | null;
    isSyncing: boolean;
    onSync: VoidFuncNoParam;
    coffeeShopId: string;
}

export function KavappInventoryHeader({
    lastSyncDate,
    isSyncing,
    onSync,
    coffeeShopId,
}: KavappInventoryHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                {lastSyncDate && (
                    <Text className="text-muted-foreground text-sm">
                        Остання синхронізація: {formatDateToDateTime(lastSyncDate)}
                    </Text>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    text="Синхронізувати"
                    iconName={iconNames.refreshCw}
                    loading={isSyncing}
                    onClick={onSync}
                />
                <Select
                    options={[{ value: "alert-rules", label: "Налаштування сповіщень" }]}
                    placeholder="•••"
                    onValueChange={() =>
                        navigateTo(router, routeKeys.kavappInventoryAlertRules(coffeeShopId))
                    }
                />
            </div>
        </div>
    );
}
