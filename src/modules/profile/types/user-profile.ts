import { UserStatusKey } from "@/modules/auth/enums/user-status-key";

export interface UserProfile {
    _id: string;
    userId: string;
    userName: string;
    email: string;
    password?: string;
    userStatus: UserStatusKey;
    isVerified: boolean;
    blockReason?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    createdAt?: string;
    updatedAt?: string;
}
