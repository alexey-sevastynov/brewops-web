export const workspacePlanKeys = {
    free: "free",
    pro: "pro",
    business: "business",
} as const;

export type WorkspacePlanKey = (typeof workspacePlanKeys)[keyof typeof workspacePlanKeys];

export interface Workspace {
    _id: string;
    name: string;
    planKey: WorkspacePlanKey;
    createdAt?: string;
    updatedAt?: string;
}
