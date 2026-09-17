import { nameOf } from "@/shared/utils/name-of";
import { OwnerWithdrawal } from "@/modules/owner-withdrawal/types/owner-withdrawal";
import { WorkspaceMember } from "@/modules/workspace/configs/workspace-member-columns";

export const workspaceMemberProps: Record<keyof WorkspaceMember, string> = {
    _id: nameOf<OwnerWithdrawal>("_id"),
    userId: nameOf<WorkspaceMember>("userId"),
    role: nameOf<WorkspaceMember>("role"),
    permissions: nameOf<WorkspaceMember>("permissions"),
    coffeeShopAccess: nameOf<WorkspaceMember>("coffeeShopAccess"),
} as const;
