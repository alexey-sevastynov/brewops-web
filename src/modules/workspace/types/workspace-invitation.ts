import { CoffeeShopAccessItem } from "@/modules/workspace/types/workspace-member";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";

export interface WorkspaceInvitation {
    _id: string;
    email: string;
    role: WorkspaceRoleKey;
    permissions: string[];
    coffeeShopAccess: CoffeeShopAccessItem[];
    status: string;
    invitedBy?: string;
    createdAt?: string;
}

export interface CreateWorkspaceInvitationPayload {
    workspaceId: string;
    email: string;
    role: WorkspaceRoleKey;
    permissions?: string[];
    coffeeShopAccess?: CoffeeShopAccessItem[];
}

export interface UpdateWorkspaceInvitationPayload {
    workspaceId: string;
    invitationId: string;
    email?: string;
    role: WorkspaceRoleKey;
    permissions?: string[];
    coffeeShopAccess?: CoffeeShopAccessItem[];
}

export interface DeleteWorkspaceInvitationPayload {
    workspaceId: string;
    invitationId: string;
}
