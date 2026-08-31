import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "@/modules/workspace/workspace-types";
import {
    changeWorkspacePlan,
    getWorkspaces,
    updateWorkspace,
} from "@/modules/workspace/workspace-thunks";
import { ApiError } from "@/shared/types/api-error/api-error-type";

export interface WorkspaceState {
    workspaces: Workspace[];
    selectedWorkspaceId: string | null;
    isLoading: boolean;
    error: ApiError | null;
}

const initialState: WorkspaceState = {
    workspaces: [],
    selectedWorkspaceId: null,
    isLoading: false,
    error: null,
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
    extraReducers: (builder) => {
        builder
            .addCase(getWorkspaces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getWorkspaces.fulfilled, (state, action) => {
                state.workspaces = action.payload;
                state.isLoading = false;
            })
            .addCase(getWorkspaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(updateWorkspace.fulfilled, (state, action) => {
                const index = state.workspaces.findIndex(({ _id }) => _id === action.payload._id);

                if (index !== -1) state.workspaces[index] = action.payload;
            })
            .addCase(changeWorkspacePlan.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeWorkspacePlan.fulfilled, (state, action) => {
                const index = state.workspaces.findIndex(({ _id }) => _id === action.payload._id);

                if (index !== -1) state.workspaces[index] = action.payload;

                state.isLoading = false;
            })
            .addCase(changeWorkspacePlan.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            });
    },
});

export const { setSelectedWorkspaceId, clearWorkspaceError } = workspaceSlice.actions;
export default workspaceSlice.reducer;
