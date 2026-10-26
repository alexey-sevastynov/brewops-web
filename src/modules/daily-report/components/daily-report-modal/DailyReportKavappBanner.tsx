import { VoidFuncNoParam } from "@/shared/types/getter-setter-functions";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { Text } from "@/shared/ui/typography/text/Text";

interface DailyReportKavappBannerProps {
    onSync: VoidFuncNoParam;
    isSyncing: boolean;
}

export function DailyReportKavappBanner({ onSync, isSyncing }: DailyReportKavappBannerProps) {
    return (
        <div className="border-border bg-accent/20 flex items-center justify-between gap-3 rounded-xl border p-3">
            <div className="flex flex-col">
                <Text>Синхронізація з Kavapp</Text>
            </div>
            <Button
                type="button"
                text="Синхронізувати"
                iconName={iconNames.refreshCw}
                loading={isSyncing}
                onClick={onSync}
            />
        </div>
    );
}
