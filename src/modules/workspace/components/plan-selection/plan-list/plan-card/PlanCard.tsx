import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { Badge } from "@/shared/ui/badge/Badge";
import { Card } from "@/shared/ui/card/Card";
import { textPositions } from "@/shared/ui/typography/text-position";
import { textSizes } from "@/shared/ui/typography/text-size";
import { Title } from "@/shared/ui/typography/title/Title";
import { Text } from "@/shared/ui/typography/text/Text";
import { Button } from "@/shared/ui/button/Button";
import { WorkspaceSubscriptionPlan } from "@/modules/workspace/types/workspace-subscription-plan";
import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import { workspacePlanKeys } from "@/modules/workspace/constants/workspace-plan-keys";
import { FeatureList } from "@/modules/workspace/components/plan-selection/plan-list/plan-card/feature-list/FeatureList";

interface PlanCardProps {
    plan: WorkspaceSubscriptionPlan;
    isCurrent: boolean;
    isLoading: boolean;
    onSelect: VoidFunc<WorkspacePlanKey>;
}

export function PlanCard({ plan, isCurrent, isLoading, onSelect }: PlanCardProps) {
    const isPaidPlan = plan.key !== workspacePlanKeys.free;

    return (
        <Card isActive={isCurrent}>
            {isPaidPlan && !isCurrent && (
                <div className="absolute top-4 right-4">
                    <Badge color="bg-rose-500/10" textColor="text-rose-500">
                        Через підтримку
                    </Badge>
                </div>
            )}
            <div>
                <Title textPosition={textPositions.left} textSize={textSizes.xl}>
                    {plan.name}
                </Title>
                <Text className="mt-3">{plan.price}</Text>
                <Text>на місяць</Text>
                <FeatureList features={plan.features} />
            </div>
            <Button
                text={isCurrent ? "Поточний тариф" : isPaidPlan ? "Зверніться до підтримки" : "Обрати тариф"}
                disabled={isCurrent || (isPaidPlan && !isCurrent)}
                loading={isLoading}
                onClick={() => onSelect(plan.key)}
            />
        </Card>
    );
}
