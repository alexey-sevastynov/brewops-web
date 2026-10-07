import { WithObjectId } from "@/shared/types/with-object-id";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";

export interface MemberUser extends WithObjectId {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface CoffeeShopAccessItem {
    coffeeShopId: string;
    role?: string;
    permissions: string[];
}

export interface WorkspaceMember extends WithObjectId {
    userId: MemberUser;
    role: WorkspaceRoleKey;
    permissions?: string[];
    coffeeShopAccess?: CoffeeShopAccessItem[];
}

export interface UpdateWorkspaceMemberPayload {
    workspaceId: string;
    memberId: string;
    role: WorkspaceRoleKey | string;
    permissions?: string[];
    coffeeShopAccess?: CoffeeShopAccessItem[];
}

export interface DeleteWorkspaceMemberPayload {
    workspaceId: string;
    memberId: string;
}
