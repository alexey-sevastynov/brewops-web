import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { WorkspaceState } from "@/modules/workspace/model/workspace-slice";
import {
    changeWorkspacePlan,
    createWorkspaceInvitation,
    deleteWorkspaceInvitation,
    deleteWorkspaceMember,
    getWorkspaceInvitations,
    getWorkspaceMembers,
    getWorkspaces,
    updateWorkspace,
    updateWorkspaceInvitation,
    updateWorkspaceMember,
} from "@/modules/workspace/model/workspace-thunks";
import { signOut } from "@/modules/auth/model/slice";
import { WorkspaceInvitation } from "@/modules/workspace/types/workspace-invitation";

const addWorkspaceReducers = (builder: ActionReducerMapBuilder<WorkspaceState>) => {
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

            if (index !== -1) {
                state.workspaces[index] = {
                    ...state.workspaces[index],
                    ...action.payload,
                };
            }
        })
        .addCase(changeWorkspacePlan.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(changeWorkspacePlan.fulfilled, (state, action) => {
            const index = state.workspaces.findIndex(({ _id }) => _id === action.payload._id);

            if (index !== -1) {
                state.workspaces[index] = {
                    ...state.workspaces[index],
                    ...action.payload,
                };
            }

            state.isLoading = false;
        })
        .addCase(changeWorkspacePlan.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? null;
        });
};

const addMemberReducers = (builder: ActionReducerMapBuilder<WorkspaceState>) => {
    builder
        .addCase(getWorkspaceMembers.pending, (state) => {
            state.isMembersLoading = true;
        })
        .addCase(getWorkspaceMembers.fulfilled, (state, action) => {
            state.members = action.payload;
            state.isMembersLoading = false;
        })
        .addCase(getWorkspaceMembers.rejected, (state) => {
            state.isMembersLoading = false;
        })
        .addCase(updateWorkspaceMember.fulfilled, (state, action) => {
            const index = state.members.findIndex(({ _id }) => _id === action.payload._id);

            if (index !== -1) {
                state.members[index] = {
                    ...state.members[index],
                    ...action.payload,
                    userId: state.members[index].userId,
                };
            }
        })
        .addCase(deleteWorkspaceMember.fulfilled, (state, action) => {
            state.members = state.members.filter(({ _id }) => _id !== action.payload.memberId);
        });
};

const addInvitationReducers = (builder: ActionReducerMapBuilder<WorkspaceState>) => {
    builder
        .addCase(getWorkspaceInvitations.pending, (state) => {
            state.isInvitationsLoading = true;
        })
        .addCase(getWorkspaceInvitations.fulfilled, (state, action) => {
            state.invitations = action.payload;
            state.isInvitationsLoading = false;
        })
        .addCase(getWorkspaceInvitations.rejected, (state) => {
            state.isInvitationsLoading = false;
        })
        .addCase(createWorkspaceInvitation.fulfilled, (state, action) => {
            if (!("_id" in action.payload)) {
                return;
            }

            const invitation = action.payload as WorkspaceInvitation;
            const index = state.invitations.findIndex(({ _id }) => _id === invitation._id);

            if (index !== -1) {
                state.invitations[index] = invitation;
            } else {
                state.invitations.push(invitation);
            }
        })
        .addCase(updateWorkspaceInvitation.fulfilled, (state, action) => {
            const index = state.invitations.findIndex(({ _id }) => _id === action.payload._id);

            if (index !== -1) {
                state.invitations[index] = action.payload;
            }
        })
        .addCase(deleteWorkspaceInvitation.fulfilled, (state, action) => {
            state.invitations = state.invitations.filter(({ _id }) => _id !== action.payload.invitationId);
        });
};

const addAuthReducers = (builder: ActionReducerMapBuilder<WorkspaceState>) => {
    builder.addCase(signOut, (state) => {
        state.members = [];
        state.invitations = [];
        state.isMembersLoading = false;
        state.isInvitationsLoading = false;
    });
};

export const workspaceExtraReducers = (builder: ActionReducerMapBuilder<WorkspaceState>) => {
    addWorkspaceReducers(builder);
    addMemberReducers(builder);
    addInvitationReducers(builder);
    addAuthReducers(builder);
};
