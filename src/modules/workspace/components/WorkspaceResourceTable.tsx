"use client";

import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Workspace } from "@/modules/workspace/workspace-types";
import { getWorkspaces, updateWorkspace } from "@/modules/workspace/workspace-thunks";
import { workspaceColumns, workspaceFormFields, createWorkspaceActionsColumn } from "@/modules/workspace/workspace-config";

export function WorkspaceResourceTable() {
    const dispatch = useAppDispatch();
    const workspaces = useAppSelector((state) => state.workspace.workspaces);
    const isLoading = useAppSelector((state) => state.workspace.isLoading);

    return (
        <ResourceTable<Workspace>
            title="Ваші workspace"
            data={workspaces}
            isLoading={isLoading}
            columns={workspaceColumns}
            formFields={workspaceFormFields}
            createActionsColumn={createWorkspaceActionsColumn}
            editTitle="Перейменувати workspace"
            onUpdate={async ({ _id, name }) => {
                await dispatch(updateWorkspace({ _id, name })).unwrap();
                await dispatch(getWorkspaces());
            }}
            exportConfig={{ fileName: "workspaces", sheetName: "Workspace" }}
        />
    );
}
