import { nameOf } from "@/shared/utils/name-of";
import { User } from "@/modules/user/types/user";

export const userProps: Record<keyof User, string> = {
    _id: nameOf<User>("_id"),
    userId: nameOf<User>("userId"),
    userName: nameOf<User>("userName"),
    email: nameOf<User>("email"),
    password: nameOf<User>("password"),
    userStatus: nameOf<User>("userStatus"),
    isVerified: nameOf<User>("isVerified"),
    blockReason: nameOf<User>("blockReason"),
    firstName: nameOf<User>("firstName"),
    lastName: nameOf<User>("lastName"),
    phoneNumber: nameOf<User>("phoneNumber"),
    createdAt: nameOf<User>("createdAt"),
    updatedAt: nameOf<User>("updatedAt"),
} as const;
