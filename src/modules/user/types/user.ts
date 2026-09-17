import { UserStatusKey } from "@/modules/auth/enums/user-status-key";
import { WithObjectId } from "@/shared/types/with-object-id";
import { EntityTimestamps } from "@/shared/types/entity-timestamps";

export interface User extends WithObjectId, EntityTimestamps {
    userId: string;
    userName: string;
    email: string;
    password: string;
    userStatus: UserStatusKey;
    isVerified: boolean;
    blockReason?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}
