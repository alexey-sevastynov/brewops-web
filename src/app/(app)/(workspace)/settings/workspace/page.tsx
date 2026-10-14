import { routeLabels } from "@/shared/constants/route-labels";
import { WorkspaceMembersTable } from "@/modules/workspace/components/workspace-members-table/WorkspaceMembersTable";
import { WorkspaceInvitationsTable } from "@/modules/workspace/components/workspace-invite-modal/WorkspaceInvitationsTable";
import { SettingsBreadcrumbs } from "@/app/(app)/(workspace)/settings/SettingsBreadcrumbs";

export default function WorkspaceSettingsPage() {
    return (
        <div className="space-y-6">
            <SettingsBreadcrumbs currentLabel={routeLabels.workspaceSettings} />
            <WorkspaceMembersTable />
            <WorkspaceInvitationsTable />
        </div>
    );
}
