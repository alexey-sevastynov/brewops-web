import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/shared/lib/axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import { convertToApiError } from "@/shared/lib/api-error";
import { WithRejectValue } from "@/modules/auth/types/with-reject-value";
import { Workspace, WorkspacePlanKey } from "@/modules/workspace/workspace-types";

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
            const { data } = await apiClient.patch<Workspace>(`${apiEndpointNames.workspaces}/${_id}`, { name });
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
