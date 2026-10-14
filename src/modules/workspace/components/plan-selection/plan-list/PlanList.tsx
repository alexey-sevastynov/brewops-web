import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { workspaceSubscriptionPlans } from "@/modules/workspace/constants/workspace-subscription-plans";
import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import { PlanCard } from "@/modules/workspace/components/plan-selection/plan-list/plan-card/PlanCard";

interface PlanListProps {
    currentPlanKey: WorkspacePlanKey;
    isLoading: boolean;
    onSelect: VoidFunc<WorkspacePlanKey>;
}

export function PlanList({ currentPlanKey, isLoading, onSelect }: PlanListProps) {
    return (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workspaceSubscriptionPlans.map((plan) => (
                <PlanCard
                    key={plan.key}
                    plan={plan}
                    isCurrent={currentPlanKey === plan.key}
                    isLoading={isLoading}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
