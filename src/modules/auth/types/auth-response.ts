export interface AuthResponse {
    token: string;
    userId: string;
    userName: string;
    isVerified: boolean;
    workspaceId?: string;
}
