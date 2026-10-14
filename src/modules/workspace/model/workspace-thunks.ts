import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/shared/lib/axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { Workspace } from "@/modules/workspace/types/workspace";
import { WorkspacePlanKey } from "@/modules/workspace/types/workspace-plan-key";
import {
    DeleteWorkspaceMemberPayload,
    UpdateWorkspaceMemberPayload,
    WorkspaceMember,
} from "@/modules/workspace/types/workspace-member";
import {
    CreateWorkspaceInvitationPayload,
    DeleteWorkspaceInvitationPayload,
    UpdateWorkspaceInvitationPayload,
    WorkspaceInvitation,
} from "@/modules/workspace/types/workspace-invitation";

export const getWorkspaces = createAsyncThunk<Workspace[], void, WithRejectValue>(
    "workspace/getWorkspaces",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<Workspace[]>(apiEndpointNames.workspaces);

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const updateWorkspace = createAsyncThunk<Workspace, Pick<Workspace, "_id" | "name">, WithRejectValue>(
    "workspace/updateWorkspace",
    async ({ _id, name }, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.patch<Workspace>(`${apiEndpointNames.workspaces}/${_id}`, {
                name,
            });

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const changeWorkspacePlan = createAsyncThunk<
    Workspace,
    { workspaceId: string; planKey: WorkspacePlanKey },
    WithRejectValue
>("workspace/changePlan", async ({ workspaceId, planKey }, { rejectWithValue }) => {
    try {
        const { data } = await apiClient.post<Workspace>(
            `${apiEndpointNames.workspaces}/${workspaceId}/change-plan`,
            { planKey },
        );

        return data;
    } catch (error) {
        return rejectWithValue(convertToApiError(error));
    }
});

export const getWorkspaceMembers = createAsyncThunk<WorkspaceMember[], string, WithRejectValue>(
    "workspace/getMembers",
    async (workspaceId, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<WorkspaceMember[]>(
                apiEndpointNames.workspaceMembers(workspaceId),
            );

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const updateWorkspaceMember = createAsyncThunk<
    WorkspaceMember,
    UpdateWorkspaceMemberPayload,
    WithRejectValue
>(
    "workspace/updateMember",
    async ({ workspaceId, memberId, role, permissions, coffeeShopAccess }, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.patch<WorkspaceMember>(
                apiEndpointNames.workspaceMember(workspaceId, memberId),
                { role, permissions, coffeeShopAccess },
            );

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const deleteWorkspaceMember = createAsyncThunk<
    { success: boolean; memberId: string },
    DeleteWorkspaceMemberPayload,
    WithRejectValue
>(
    "workspace/deleteMember",
    async ({ workspaceId, memberId }, { rejectWithValue }) => {
        try {
            await apiClient.delete(apiEndpointNames.workspaceMember(workspaceId, memberId));

            return { success: true, memberId };
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const getWorkspaceInvitations = createAsyncThunk<WorkspaceInvitation[], string, WithRejectValue>(
    "workspace/getInvitations",
    async (workspaceId, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.get<WorkspaceInvitation[]>(
                apiEndpointNames.workspaceInvitations(workspaceId),
            );

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const createWorkspaceInvitation = createAsyncThunk<
    WorkspaceInvitation | { success: boolean; addedDirectly: boolean },
    CreateWorkspaceInvitationPayload,
    WithRejectValue
>(
    "workspace/createInvitation",
    async ({ workspaceId, email, role, permissions, coffeeShopAccess }, { rejectWithValue }) => {
        try {
            const { data } = await apiClient.post<
                WorkspaceInvitation | { success: boolean; addedDirectly: boolean }
            >(apiEndpointNames.workspaceInvitations(workspaceId), {
                email,
                role,
                permissions,
                coffeeShopAccess,
            });

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const updateWorkspaceInvitation = createAsyncThunk<
    WorkspaceInvitation,
    UpdateWorkspaceInvitationPayload,
    WithRejectValue
>(
    "workspace/updateInvitation",
    async (
        { workspaceId, invitationId, email, role, permissions, coffeeShopAccess },
        { rejectWithValue },
    ) => {
        try {
            const { data } = await apiClient.patch<WorkspaceInvitation>(
                apiEndpointNames.workspaceInvitation(workspaceId, invitationId),
                { email, role, permissions, coffeeShopAccess },
            );

            return data;
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);

export const deleteWorkspaceInvitation = createAsyncThunk<
    { success: boolean; invitationId: string },
    DeleteWorkspaceInvitationPayload,
    WithRejectValue
>(
    "workspace/deleteInvitation",
    async ({ workspaceId, invitationId }, { rejectWithValue }) => {
        try {
            await apiClient.delete(apiEndpointNames.workspaceInvitation(workspaceId, invitationId));

            return { success: true, invitationId };
        } catch (error) {
            return rejectWithValue(convertToApiError(error));
        }
    },
);
