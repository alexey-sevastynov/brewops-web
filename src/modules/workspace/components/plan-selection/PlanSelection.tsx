"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Title } from "@/shared/ui/typography/title/Title";
import { Text } from "@/shared/ui/typography/text/Text";
import { textPositions } from "@/shared/ui/typography/text-position";
import { selectPlan } from "@/modules/workspace/components/plan-selection/PlanSelection.funcs";
import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import { PlanSelectionNotice } from "@/modules/workspace/components/plan-selection/plan-selection-notice/PlanSelectionNotice";
import { PlanList } from "@/modules/workspace/components/plan-selection/plan-list/PlanList";

export function PlanSelection() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const workspace = useAppSelector((state) =>
        state.workspace.workspaces.find(({ _id }) => _id === state.workspace.selectedWorkspaceId),
    );
    const isLoading = useAppSelector((state) => state.workspace.isLoading);
    const error = useAppSelector((state) => state.workspace.error);

    if (!workspaceId || !workspace) return null;

    return (
        <section>
            <div className="mb-8">
                <Title textPosition={textPositions.left}>Оберіть тариф</Title>
                <Text>Поточний тариф workspace: {workspace.planKey}</Text>
            </div>
            <PlanSelectionNotice />
            <PlanList
                currentPlanKey={workspace.planKey}
                isLoading={isLoading}
                onSelect={(planKey: WorkspacePlanKey) => selectPlan(dispatch, router, workspaceId, planKey)}
            />
            {error && <Text className="mt-4">{error.message}</Text>}
        </section>
    );
}
