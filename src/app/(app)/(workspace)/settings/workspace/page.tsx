import { routeLabels } from "@/shared/constants/route-labels";
import { WorkspaceMembersTable } from "@/modules/workspace/components/WorkspaceMembersTable";
import { SettingsBreadcrumbs } from "@/app/(app)/(workspace)/settings/SettingsBreadcrumbs";

export default function WorkspaceSettingsPage() {
    return (
        <>
            <SettingsBreadcrumbs currentLabel={routeLabels.workspaceSettings} />
            <WorkspaceMembersTable />
        </>
    );
}
