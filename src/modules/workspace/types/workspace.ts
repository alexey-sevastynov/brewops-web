import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { EntityTimestamps } from "@/shared/types/entity-timestamps";
import { WithObjectId } from "@/shared/types/with-object-id";

export interface Workspace extends WithObjectId, EntityTimestamps {
    name: string;
    planKey: WorkspacePlanKey;
    role: WorkspaceRoleKey;
    isOwner: boolean;
}
