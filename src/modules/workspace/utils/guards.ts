import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";
import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import { workspacePlanKeys } from "@/modules/workspace/constants/workspace-plan-keys";

export function isOwnerRole(role: WorkspaceRoleKey) {
    return role === workspaceRoleKeys.owner;
}

export function isAdminRole(role: WorkspaceRoleKey) {
    return role === workspaceRoleKeys.admin;
}

export function isOwnerOrAdminRole(role: WorkspaceRoleKey) {
    return isOwnerRole(role) || isAdminRole(role);
}

export function isFreePlan(workspacePlanKey: WorkspacePlanKey) {
    return workspacePlanKey === workspacePlanKeys.free;
}
