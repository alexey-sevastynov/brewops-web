import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppDispatch } from "@/store";
import { navigateTo } from "@/shared/utils/navigation";
import { routeKeys } from "@/shared/constants/route-keys";
import { changeWorkspacePlan } from "@/modules/workspace/model/workspace-thunks";
import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import { isFreePlan } from "@/modules/workspace/utils/guards";

export async function selectPlan(
    dispatch: AppDispatch,
    router: AppRouterInstance,
    workspaceId: string,
    planKey: WorkspacePlanKey,
) {
    if (!isFreePlan(planKey)) return;

    await dispatch(changeWorkspacePlan({ workspaceId, planKey })).unwrap();

    navigateTo(router, routeKeys.workspaceSettings);
}
