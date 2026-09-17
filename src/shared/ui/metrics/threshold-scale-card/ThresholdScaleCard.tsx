import { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/typography/text/Text";
import { textSizes } from "@/shared/ui/typography/text-size";
import { textWeights } from "@/shared/ui/typography/text-weight";
import { Card } from "@/shared/ui/card/Card";

interface ThresholdScaleCardProps {
    title: string;
    value: string;
    currentValue: number;
    maxValue: number;
    acceptableFrom: number;
    riskFrom: number;
    targetLabel?: string;
    acceptableLabel?: string;
    riskLabel?: string;
    targetRangeLabel?: string;
    acceptableRangeLabel?: string;
    riskRangeLabel?: string;
    description?: ReactNode;
    className?: string;
}

export function ThresholdScaleCard({
    title,
    value,
    currentValue,
    maxValue,
    acceptableFrom,
    riskFrom,
    targetLabel = "Ідеал",
    acceptableLabel = "Норма",
    riskLabel = "Критично",
    targetRangeLabel = "Ідеал",
    acceptableRangeLabel = "Норма",
    riskRangeLabel = "Критично",
    description,
}: ThresholdScaleCardProps) {
    const markerLeft = `${clamp((currentValue / maxValue) * 100, 0, 100)}%`;
    const targetWidth = `${clamp((acceptableFrom / maxValue) * 100, 0, 100)}%`;
    const acceptableWidth = `${clamp(((riskFrom - acceptableFrom) / maxValue) * 100, 0, 100)}%`;
    const riskWidth = `${clamp(((maxValue - riskFrom) / maxValue) * 100, 0, 100)}%`;
    const status = getScaleStatus(currentValue, acceptableFrom, riskFrom, {
        targetLabel,
        acceptableLabel,
        riskLabel,
    });

    return (
        <Card>
            <div className="flex items-start justify-between gap-4">
                <Text textSize={textSizes.sm}>{title}</Text>
                <div className={cn("rounded-full px-2 py-1 text-xs font-medium", status.badgeClassName)}>
                    {status.label}
                </div>
            </div>

            <Text className="mt-2" textWeight={textWeights.bold}>
                {value}
            </Text>

            <div className="mt-4">
                <div className="relative pt-5">
                    <div className="bg-muted flex h-3 overflow-hidden rounded-full">
                        <div className="bg-emerald-500" style={{ width: targetWidth }} />
                        <div className="bg-amber-400" style={{ width: acceptableWidth }} />
                        <div className="bg-rose-500" style={{ width: riskWidth }} />
                    </div>

                    <div className="absolute top-0 -translate-x-1/2" style={{ left: markerLeft }}>
                        <div className="flex flex-col items-center gap-1">
                            <div className="bg-foreground text-background rounded-md px-1.5 py-0.5 text-[11px] font-medium">
                                {value}
                            </div>
                            <div className="bg-foreground/80 h-3 w-0.5" />
                        </div>
                    </div>
                </div>

                <div className="text-muted-foreground mt-3 flex flex-wrap gap-3 text-xs">
                    <ScaleLegend colorClassName="bg-emerald-500" label={targetRangeLabel} />
                    <ScaleLegend colorClassName="bg-amber-400" label={acceptableRangeLabel} />
                    <ScaleLegend colorClassName="bg-rose-500" label={riskRangeLabel} />
                </div>
            </div>

            {description && <div className="text-muted-foreground mt-3 text-[13px]">{description}</div>}
        </Card>
    );
}

function ScaleLegend({ colorClassName, label }: { colorClassName: string; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", colorClassName)} />
            <span>{label}</span>
        </div>
    );
}

function getScaleStatus(
    currentValue: number,
    acceptableFrom: number,
    riskFrom: number,
    labels: { targetLabel: string; acceptableLabel: string; riskLabel: string },
) {
    if (currentValue > riskFrom) {
        return {
            label: labels.riskLabel,
            badgeClassName: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
        };
    }

    if (currentValue > acceptableFrom) {
        return {
            label: labels.acceptableLabel,
            badgeClassName: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
        };
    }

    return {
        label: labels.targetLabel,
        badgeClassName: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    };
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
