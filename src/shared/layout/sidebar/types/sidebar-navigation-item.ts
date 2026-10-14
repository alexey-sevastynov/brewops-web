import { IconColor } from "@/shared/ui/icon/icon-color";
import { IconName } from "@/shared/ui/icon/icon-name";

export interface SidebarNavigationItemConfig {
    href: string;
    iconName: IconName;
    label: string;
    iconColor?: IconColor;
    disabled?: boolean;
    disabledMessage?: string;
}
