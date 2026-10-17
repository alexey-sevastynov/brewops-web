import { StatisticsHighlights } from "@/modules/statistics/types/statistics-highlights";
import { HighlightPair } from "@/modules/statistics/components/page/statistics-dashboard/sections/highlights-section/HighlightPair";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { formatNumber } from "@/shared/utils/number";
import { formatUah } from "@/shared/utils/currency";

interface KavappHighlightsProps {
    highlights: StatisticsHighlights;
}

export function KavappHighlights({ highlights }: KavappHighlightsProps) {
    return (
        <>
            {highlights.checksCount && (
                <HighlightPair
                    title="Кількість чеків"
                    iconName={iconNames.receipt}
                    best={highlights.checksCount.max}
                    worst={highlights.checksCount.min}
                    bestTitle="Максимальна за день"
                    worstTitle="Мінімальна за день"
                    formatValue={formatNumber}
                />
            )}

            {highlights.averageCheck && (
                <HighlightPair
                    title="Середній чек"
                    iconName={iconNames.receiptText}
                    best={highlights.averageCheck.max}
                    worst={highlights.averageCheck.min}
                    bestTitle="Максимальний за день"
                    worstTitle="Мінімальний за день"
                    formatValue={formatUah}
                />
            )}

            {highlights.itemsSold && (
                <HighlightPair
                    title="Продано позицій"
                    iconName={iconNames.package}
                    best={highlights.itemsSold.max}
                    worst={highlights.itemsSold.min}
                    bestTitle="Максимально за день"
                    worstTitle="Мінімально за день"
                    formatValue={formatNumber}
                />
            )}

            {highlights.itemsPerCheck && (
                <HighlightPair
                    title="Позицій у чеку"
                    iconName={iconNames.shoppingCart}
                    best={highlights.itemsPerCheck.max}
                    worst={highlights.itemsPerCheck.min}
                    bestTitle="Максимально за день"
                    worstTitle="Мінімально за день"
                    formatValue={(value) => formatNumber(value, 2)}
                />
            )}
        </>
    );
}
