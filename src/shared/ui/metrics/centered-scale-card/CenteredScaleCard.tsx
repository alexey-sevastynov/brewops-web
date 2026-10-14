import { ReactNode, useMemo } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/typography/text/Text";
import { textSizes } from "@/shared/ui/typography/text-size";
import { textWeights } from "@/shared/ui/typography/text-weight";
import { Card } from "@/shared/ui/card/Card";

type ZoneType = "ideal" | "normal" | "critical";

export interface RangeZone {
    from: number;
    to: number;
    type: ZoneType;
}

interface CenteredScaleCardProps {
    title: string;
    value: string;
    currentValue: number;
    minValue: number;
    maxValue: number;
    zones: RangeZone[];
    description?: ReactNode;
    className?: string;
}

const zoneStyles: Record<ZoneType, string> = {
    ideal: "bg-emerald-500",
    normal: "bg-amber-400",
    critical: "bg-rose-500",
};

const statusStyles: Record<ZoneType, string> = {
    ideal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    normal: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    critical: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
};

const statusLabels: Record<ZoneType, string> = {
    ideal: "Ідеал",
    normal: "Норма",
    critical: "Критично",
};

export function CenteredScaleCard({
    title,
    value,
    currentValue,
    minValue,
    maxValue,
    zones,
    description,
}: CenteredScaleCardProps) {
    const clamped = clamp(currentValue, minValue, maxValue);
    const range = maxValue - minValue;

    const { status, markerLeft } = useMemo(() => {
        const active = zones.find((z) => clamped >= z.from && clamped <= z.to) ?? zones[0];
        const position = range === 0 ? 0 : ((clamped - minValue) / range) * 100;

        return {
            status: active.type,
            markerLeft: position,
        };
    }, [clamped, zones, minValue, range]);

    return (
        <Card>
            <div className="flex items-start justify-between gap-4">
                <Text textSize={textSizes.sm}>{title}</Text>

                <div className={cn("rounded-full px-2 py-1 text-xs font-medium", statusStyles[status])}>
                    {statusLabels[status]}
                </div>
            </div>

            <Text className="mt-2" textWeight={textWeights.bold}>
                {value}
            </Text>

            <div className="mt-4">
                <div className="relative pt-5">
                    <div className="bg-muted flex h-3 overflow-hidden rounded-full">
                        {zones.map((z, i) => {
                            const width = range === 0 ? 0 : ((z.to - z.from) / range) * 100;

                            return (
                                <div key={i} className={zoneStyles[z.type]} style={{ width: `${width}%` }} />
                            );
                        })}
                    </div>

                    <div className="absolute top-0 -translate-x-1/2" style={{ left: `${markerLeft}%` }}>
                        <div className="flex flex-col items-center gap-1">
                            <div className="bg-foreground text-background rounded-md px-1.5 py-0.5 text-[11px] font-medium">
                                {value}
                            </div>
                            <div className="bg-foreground/80 h-3 w-0.5" />
                        </div>
                    </div>
                </div>

                <div className="text-muted-foreground mt-3 flex justify-between text-xs">
                    <span>{minValue}</span>
                    <span>0</span>
                    <span>{maxValue}</span>
                </div>
            </div>

            {description && <div className="text-muted-foreground mt-3 text-[13px]">{description}</div>}
        </Card>
    );
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
