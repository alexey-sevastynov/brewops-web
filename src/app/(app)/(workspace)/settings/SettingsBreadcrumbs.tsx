import { routeKeys } from "@/shared/constants/route-keys";
import { routeLabels } from "@/shared/constants/route-labels";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface SettingsBreadcrumbsProps {
    currentLabel: string;
}

export function SettingsBreadcrumbs({ currentLabel }: SettingsBreadcrumbsProps) {
    const items = [
        {
            label: routeLabels.home,
            href: routeKeys.home,
        },
        {
            label: routeLabels.settings,
            href: routeKeys.settings,
        },
        {
            label: currentLabel,
        },
    ];

    return <Breadcrumbs items={items} />;
}
