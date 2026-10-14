import { workspacePlanKeys } from "@/modules/workspace/constants/workspace-plan-keys";

export type WorkspacePlanKey = (typeof workspacePlanKeys)[keyof typeof workspacePlanKeys];
