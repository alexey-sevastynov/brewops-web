import { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/typography/text/Text";
import { textWeights } from "@/shared/ui/typography/text-weight";
import { IconName } from "@/shared/ui/icon/icon-name";
import { Icon } from "@/shared/ui/icon/Icon";
import { iconSizes } from "@/shared/ui/icon/icon-size";
import { iconColors } from "@/shared/ui/icon/icon-color";
import { iconStrokeWidths } from "@/shared/ui/icon/icon-stroke-width";
import { textSizes } from "@/shared/ui/typography/text-size";
import { VoidFuncNoParam } from "@/shared/types/getter-setter-functions";
import { Card } from "@/shared/ui/card/Card";

interface MetricCardProps {
    title: string;
    value: string;
    iconName: IconName;
    description?: ReactNode;
    className?: string;
    onClick?: VoidFuncNoParam;
}

export function MetricCard({ title, value, iconName, description, className, onClick }: MetricCardProps) {
    return (
        <Card
            className={cn(
                "rounded-xl border p-4 shadow-sm",
                onClick && "cursor-pointer transition hover:shadow-md",
                className,
            )}
            onClick={onClick}
        >
            <div className="flex items-center justify-between gap-4">
                <Text textSize={textSizes.sm}>{title}</Text>
                <Icon
                    name={iconName}
                    size={iconSizes.large}
                    color={iconColors.muted}
                    className="shrink-0"
                    strokeWidth={iconStrokeWidths.normal}
                />
            </div>
            <Text className="mt-2" textWeight={textWeights.bold}>
                {value}
            </Text>
            {description && <div className="mt-1 text-[13px] text-gray-500">{description}</div>}
        </Card>
    );
}
