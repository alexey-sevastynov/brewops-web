import { formatUah } from "@/shared/utils/currency";
import { formatPercent } from "@/shared/utils/number";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { Text } from "@/shared/ui/typography/text/Text";
import { StatisticsHighlights } from "@/modules/statistics/types/statistics-highlights";
import { HighlightPair } from "@/modules/statistics/components/page/statistics-dashboard/sections/highlights-section/HighlightPair";
import { KavappHighlights } from "@/modules/statistics/components/page/statistics-dashboard/sections/highlights-section/kavapp-highlights/KavappHighlights";

interface HighlightsSectionProps {
    highlights?: StatisticsHighlights;
}

export function HighlightsSection({ highlights }: HighlightsSectionProps) {
    if (!highlights) return null;

    return (
        <section className="flex flex-col gap-4">
            <Text uppercase className="tracking-wider">
                Рекорди та антирекорди за період
            </Text>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <HighlightPair
                    title="Виручка"
                    iconName={iconNames.dollarSign}
                    best={highlights.revenue.max}
                    worst={highlights.revenue.min}
                    bestTitle="Максимальна за день"
                    worstTitle="Мінімальна за день"
                    formatValue={formatUah}
                />
                <HighlightPair
                    title="Чистий прибуток"
                    iconName={iconNames.piggyBank}
                    best={highlights.netProfit.max}
                    worst={highlights.netProfit.min}
                    bestTitle="Максимальний за день"
                    worstTitle="Мінімальний за день"
                    formatValue={formatUah}
                />
                <HighlightPair
                    title="Готівковий виторг"
                    iconName={iconNames.banknote}
                    best={highlights.cashRevenue.max}
                    worst={highlights.cashRevenue.min}
                    bestTitle="Максимальний за день"
                    worstTitle="Мінімальний за день"
                    formatValue={formatUah}
                />
                <HighlightPair
                    title="Безготівковий виторг"
                    iconName={iconNames.creditCard}
                    best={highlights.terminalRevenue.max}
                    worst={highlights.terminalRevenue.min}
                    bestTitle="Максимальний за день"
                    worstTitle="Мінімальний за день"
                    formatValue={formatUah}
                />
                <HighlightPair
                    title="Food Cost"
                    iconName={iconNames.percent}
                    best={highlights.costPercent.min}
                    worst={highlights.costPercent.max}
                    bestTitle="Найнижчий за день"
                    worstTitle="Найвищий за день"
                    formatValue={formatPercent}
                />
                <HighlightPair
                    title="Списання"
                    iconName={iconNames.trash2}
                    best={highlights.writeOffPercent.min}
                    worst={highlights.writeOffPercent.max}
                    bestTitle="Найнижче за день"
                    worstTitle="Найвище за день"
                    formatValue={formatPercent}
                />
                <KavappHighlights highlights={highlights} />
            </div>
        </section>
    );
}
