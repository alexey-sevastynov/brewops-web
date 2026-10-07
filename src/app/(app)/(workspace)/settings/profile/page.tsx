import { routeLabels } from "@/shared/constants/route-labels";
import { UserSettings } from "@/modules/user/components/UserSettings";
import { SettingsBreadcrumbs } from "@/app/(app)/(workspace)/settings/SettingsBreadcrumbs";

export default function ProfileSettingsPage() {
    return (
        <>
            <SettingsBreadcrumbs currentLabel={routeLabels.profileSettings} />
            <UserSettings />
        </>
    );
}
