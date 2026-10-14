"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button/Button";
import { Icon } from "@/shared/ui/icon/Icon";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { iconColors } from "@/shared/ui/icon/icon-color";
import { routeKeys } from "@/shared/constants/route-keys";

export function KavappPlanRestrictedNotice() {
    return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
            <div className="border-border bg-card max-w-md rounded-2xl border p-8 text-center shadow-xs">
                <div className="mb-4 flex justify-center">
                    <div className="bg-destructive/10 rounded-full p-4">
                        <Icon name={iconNames.package} color={iconColors.destructive} className="h-10 w-10" />
                    </div>
                </div>
                <h2 className="text-foreground text-xl font-semibold">Інтеграція з Kavapp недоступна</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Синхронізація залишків посуду, інгредієнтів, товарів та правила сповіщень про залишки
                    доступні на тарифах PRO та BUSINESS.
                </p>
                <div className="mt-6 flex justify-center">
                    <Link href={routeKeys.plan}>
                        <Button iconName={iconNames.crown} text="Перейти до вибору тарифу" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
