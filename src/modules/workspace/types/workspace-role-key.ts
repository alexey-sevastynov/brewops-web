import { workspaceRoleKeys } from "@/modules/workspace/constants/workspace-role-keys";

export type WorkspaceRoleKey = (typeof workspaceRoleKeys)[keyof typeof workspaceRoleKeys];
