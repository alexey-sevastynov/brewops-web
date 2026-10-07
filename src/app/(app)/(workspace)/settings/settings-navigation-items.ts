import { routeLabels } from "@/shared/constants/route-labels";
import { routeKeys } from "@/shared/constants/route-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";

export const settingsNavigationItems = [
    {
        href: routeKeys.workspaceSettings,
        iconName: iconNames.settings,
        title: routeLabels.workspaceSettings,
        description: "Учасники, доступи та спільні налаштування workspace.",
    },
    {
        href: routeKeys.coffeeShopsSettings,
        iconName: iconNames.coffee,
        title: "Кавʼярні",
        description: "Керуйте кавʼярнями та їх основною інформацією.",
    },
    {
        href: routeKeys.profileSettings,
        iconName: iconNames.users,
        title: routeLabels.profileSettings,
        description: "Особисті дані, пароль та налаштування профілю.",
    },
] as const;
