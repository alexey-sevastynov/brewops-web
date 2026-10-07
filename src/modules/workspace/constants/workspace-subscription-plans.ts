import { workspacePlanKeys } from "@/modules/workspace/constants/workspace-plan-keys";
import { WorkspaceSubscriptionPlan } from "@/modules/workspace/types/workspace-subscription-plan";
import { worspacePlanNames } from "@/modules/workspace/constants/workspace-plan-names";

export const workspaceSubscriptionPlans: WorkspaceSubscriptionPlan[] = [
    {
        key: workspacePlanKeys.free,
        name: worspacePlanNames.free,
        price: "$0",
        features: ["1 кавʼярня", "5 працівників", "30 днів історії"],
    },
    {
        key: workspacePlanKeys.pro,
        name: worspacePlanNames.pro,
        price: "$29",
        features: ["5 кавʼярень", "25 працівників", "365 днів історії"],
    },
    {
        key: workspacePlanKeys.business,
        name: worspacePlanNames.business,
        price: "$79",
        features: ["Необмежені кавʼярні", "Необмежені працівники", "Необмежена історія"],
    },
] as const;
