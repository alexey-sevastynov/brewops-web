import { DailyStatisticHighlight } from "@/modules/statistics/types/statistics-highlights";
import { IconName } from "@/shared/ui/icon/icon-name";
import { MetricCard } from "@/shared/ui/metrics/metric-card/MetricCard";
import { Text } from "@/shared/ui/typography/text/Text";
import { formatDateToShortDate } from "@/shared/utils/date";

interface HighlightPairProps {
    title: string;
    iconName: IconName;
    best: DailyStatisticHighlight;
    worst: DailyStatisticHighlight;
    bestTitle: string;
    worstTitle: string;
    formatValue: (value: number) => string;
}

interface HighlightCardProps {
    title: string;
    value: string;
    iconName: IconName;
    highlight: DailyStatisticHighlight;
    variant: "best" | "worst";
}

export function HighlightPair({
    title,
    iconName,
    best,
    worst,
    bestTitle,
    worstTitle,
    formatValue,
}: HighlightPairProps) {
    return (
        <div className="flex min-w-0 flex-col gap-2">
            <Text className="text-sm font-medium">{title}</Text>

            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                <HighlightCard
                    title={bestTitle}
                    value={formatValue(best.value)}
                    iconName={iconName}
                    highlight={best}
                    variant="best"
                />

                <HighlightCard
                    title={worstTitle}
                    value={formatValue(worst.value)}
                    iconName={iconName}
                    highlight={worst}
                    variant="worst"
                />
            </div>
        </div>
    );
}

function HighlightCard({ title, value, iconName, highlight, variant }: HighlightCardProps) {
    const isBest = variant === "best";

    const className = isBest
        ? "h-full border-emerald-500/30 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.05]"
        : "h-full border-rose-500/30 bg-rose-500/[0.02] dark:bg-rose-500/[0.05]";

    return (
        <MetricCard
            title={title}
            value={value}
            iconName={iconName}
            className={className}
            description={<HighlightDescription highlight={highlight} />}
        />
    );
}

function HighlightDescription({ highlight }: { highlight: DailyStatisticHighlight }) {
    return (
        <div className="mt-1 min-w-0 text-[13px] text-gray-500 dark:text-gray-400">
            <div>{formatDateToShortDate(highlight.date)}</div>

            {highlight.employeeName?.trim() && (
                <div className="truncate font-medium text-gray-700 dark:text-gray-300">
                    {highlight.employeeName.trim()}
                </div>
            )}
        </div>
    );
}
