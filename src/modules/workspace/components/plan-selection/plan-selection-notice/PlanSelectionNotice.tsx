import { Card } from "@/shared/ui/card/Card";
import { Text } from "@/shared/ui/typography/text/Text";
import { worspacePlanNames } from "@/modules/workspace/constants/workspace-plan-names";

export function PlanSelectionNotice() {
    return (
        <Card>
            <Text className="text-foreground font-medium">Зміна тарифу</Text>
            <Text className="mt-1">
                Тарифи <strong>{worspacePlanNames.pro}</strong> та{" "}
                <strong>${worspacePlanNames.business}</strong> наразі ще в розробці. Для тестового режиму
                доступний безкоштовний тариф. Розширені тарифи будуть доступні після завершення розробки.
            </Text>
        </Card>
    );
}
