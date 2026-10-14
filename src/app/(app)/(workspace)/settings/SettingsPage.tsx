import { Title } from "@/shared/ui/typography/title/Title";
import { Text } from "@/shared/ui/typography/text/Text";
import { textPositions } from "@/shared/ui/typography/text-position";
import { Link } from "@/shared/ui/link/Link";
import { Icon } from "@/shared/ui/icon/Icon";
import { IconName } from "@/shared/ui/icon/icon-name";
import { iconSizes } from "@/shared/ui/icon/icon-size";
import { textWeights } from "@/shared/ui/typography/text-weight";
import { textSizes } from "@/shared/ui/typography/text-size";
import { settingsNavigationItems } from "@/app/(app)/(workspace)/settings/settings-navigation-items";

interface SettingsNavigationItemProps {
    href: string;
    iconName: IconName;
    title: string;
    description: string;
}

export function SettingsPage() {
    return (
        <>
            <SettingsHeader />
            <SettingsNavigation />
        </>
    );
}

function SettingsHeader() {
    return (
        <header className="mb-8">
            <Title textPosition={textPositions.left}>Налаштування</Title>
            <Text>Керуйте BrewOps в одному місці</Text>
            <Text>Оберіть розділ, який потрібно налаштувати.</Text>
        </header>
    );
}

function SettingsNavigation() {
    return (
        <nav aria-label="Розділи налаштувань" className="grid gap-4 md:grid-cols-3">
            {settingsNavigationItems.map((item) => (
                <SettingsNavigationItem key={item.href} {...item} />
            ))}
        </nav>
    );
}

function SettingsNavigationItem({ href, iconName, title, description }: SettingsNavigationItemProps) {
    return (
        <Link
            href={href}
            className="cursor-pointer rounded-xl border p-4 shadow-sm transition hover:shadow-md"
        >
            <div className="flex items-center gap-4">
                <Icon size={iconSizes.large} name={iconName} />
                <Text textSize={textSizes.xl} textWeight={textWeights.bold}>
                    {title}
                </Text>
            </div>
            <Text className="mt-8">{description}</Text>
        </Link>
    );
}
