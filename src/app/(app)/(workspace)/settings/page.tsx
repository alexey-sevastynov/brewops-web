import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { SettingsPage } from "@/app/(app)/(workspace)/settings/SettingsPage";
import { routeKeys } from "@/shared/constants/route-keys";

export const metadata = createMetadata({
    title: "Налаштування",
    resourceName: "Налаштування",
    description: "Керуйте налаштуваннями BrewOps: workspace, кав'ярнями та особистим профілем.",
    canonicalPath: routeKeys.settings,
});

export default function Page() {
    return <SettingsPage />;
}
