import { EntityTimestamps } from "@/shared/types/entity-timestamps";
import { WithObjectId } from "@/shared/types/with-object-id";
import { WorkspaceRoleKey } from "@/modules/workspace/types/workspace-role-key";

interface CoffeeShopWorkspaceInfo {
    _id: string;
    name: string;
    ownerName?: string;
    ownerEmail?: string;
}

interface CoffeeShopMyAccess {
    role: WorkspaceRoleKey;
    permissions: string[];
    isOwner: boolean;
}

export interface CoffeeShop extends WithObjectId, EntityTimestamps {
    name: string;
    workspaceId: string;
    isActive: boolean;
    myAccess: CoffeeShopMyAccess;
    description?: string;
    address?: string;
    telegramChatId?: string;
    kavappEmail?: string;
    kavappPassword?: string;
    kavappPointId?: string;
    workspace?: CoffeeShopWorkspaceInfo;
}
