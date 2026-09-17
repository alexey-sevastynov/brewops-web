import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";

export interface WorkspaceSubscriptionPlan {
    key: WorkspacePlanKey;
    name: string;
    price: string;
    features: string[];
}
