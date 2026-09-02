import NextLink from "next/link";
import { ArrowRight, Building2, Settings2, UserRound } from "lucide-react";
import { routeKeys } from "@/shared/constants/route-keys";
import { Title } from "@/shared/ui/typography/title/Title";
import { Text } from "@/shared/ui/typography/text/Text";
import { textPositions } from "@/shared/ui/typography/text-position";

const settingsSections = [
    {
        href: routeKeys.workspaceSettings,
        icon: Settings2,
        title: "Workspace",
        description: "Учасники, доступи та спільні налаштування workspace.",
    },
    {
        href: routeKeys.coffeeShopsSettings,
        icon: Building2,
        title: "Кавʼярні",
        description: "Керуйте кавʼярнями та їх основною інформацією.",
    },
    {
        href: routeKeys.profileSettings,
        icon: UserRound,
        title: "Профіль",
        description: "Особисті дані, пароль та налаштування профілю.",
    },
] as const;

export default function SettingsPage() {
    return (
        <div>
            <header>
                <Title textPosition={textPositions.left}>Налаштування</Title>
                <Text>Керуйте BrewOps в одному місці</Text>
                <Text>Оберіть розділ, який потрібно налаштувати.</Text>
            </header>

            <nav aria-label="Розділи налаштувань" className="grid gap-4 md:grid-cols-3">
                {settingsSections.map(({ href, icon: Icon, title, description }) => (
                    <NextLink
                        key={href}
                        href={href}
                        className="cursor-pointer rounded-xl border p-4 shadow-sm transition hover:shadow-md"
                    >
                        <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                            <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="mt-8 space-y-2">
                            <span className="flex items-center justify-between gap-3">
                                <span className="text-lg font-semibold">{title}</span>
                                <ArrowRight
                                    size={18}
                                    aria-hidden="true"
                                    className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
                                />
                            </span>
                            <span className="text-muted-foreground block text-sm leading-5">
                                {description}
                            </span>
                        </span>
                    </NextLink>
                ))}
            </nav>
        </div>
    );
}
