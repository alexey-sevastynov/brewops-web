import { RootState } from "@/store";
import { isOwnerOrAdminRole, isOwnerRole } from "@/modules/workspace/utils/guards";

export const selectCurrentWorkspace = (state: RootState) =>
    state.workspace.workspaces.find((workspace) => workspace._id === state.workspace.selectedWorkspaceId);

export const selectWorkspaceByCoffeeShopId = (state: RootState, coffeeShopId: string | null) => {
    const coffeeShop = state.coffeeShop.coffeeShops.find((shop) => shop._id === coffeeShopId);
    const workspaceId = coffeeShop?.workspaceId ?? state.workspace.selectedWorkspaceId;

    return state.workspace.workspaces.find((workspace) => workspace._id === workspaceId);
};

export const selectCurrentWorkspaceMember = (state: RootState) => {
    const currentUserId = state.auth.userId;
    const currentUserName = state.auth.userName;

    return state.workspace.members.find(
        (member) =>
            (currentUserId && member.userId._id === currentUserId) ||
            (currentUserName && member.userId.userName === currentUserName),
    );
};

export const selectCanManageWorkspaceMembers = (state: RootState) => {
    const currentWorkspace = selectCurrentWorkspace(state);
    const currentWorkspaceMember = selectCurrentWorkspaceMember(state);

    if (!currentWorkspace || !currentWorkspaceMember) return false;

    return (
        currentWorkspace.isOwner ||
        isOwnerOrAdminRole(currentWorkspace.role) ||
        isOwnerOrAdminRole(currentWorkspaceMember.role)
    );
};

export const selectIsWorkspaceOwner = (state: RootState) => {
    const currentWorkspace = selectCurrentWorkspace(state);

    if (!currentWorkspace) return false;

    if (currentWorkspace.isOwner) return true;

    const currentWorkspaceMember = selectCurrentWorkspaceMember(state);

    return currentWorkspaceMember ? isOwnerRole(currentWorkspaceMember.role) : false;
};
