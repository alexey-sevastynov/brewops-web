import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiError } from "@/shared/types/api-error/api-error-type";
import { Workspace } from "@/modules/workspace/types/workspace";
import { WorkspaceMember } from "@/modules/workspace/types/workspace-member";
import { WorkspaceInvitation } from "@/modules/workspace/types/workspace-invitation";
import { workspaceExtraReducers } from "@/modules/workspace/model/workspace-extra-reducers";

export interface WorkspaceState {
    workspaces: Workspace[];
    selectedWorkspaceId: string | null;
    isLoading: boolean;
    error: ApiError | null;
    members: WorkspaceMember[];
    isMembersLoading: boolean;
    invitations: WorkspaceInvitation[];
    isInvitationsLoading: boolean;
}

const initialState: WorkspaceState = {
    workspaces: [],
    selectedWorkspaceId: null,
    isLoading: false,
    error: null,
    members: [],
    isMembersLoading: false,
    invitations: [],
    isInvitationsLoading: false,
};

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setSelectedWorkspaceId(state, action: PayloadAction<string | null>) {
            state.selectedWorkspaceId = action.payload;
        },
        clearWorkspaceError(state) {
            state.error = null;
        },
    },
    extraReducers: workspaceExtraReducers,
});

export const { setSelectedWorkspaceId, clearWorkspaceError } = workspaceSlice.actions;
export default workspaceSlice.reducer;
