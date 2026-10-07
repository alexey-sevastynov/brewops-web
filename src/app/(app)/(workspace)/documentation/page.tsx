import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { Documentation } from "@/modules/documentation/components/page/Documentation";

export const metadata = createMetadata({
    title: "Документація",
    resourceName: "Документація",
    description: `Документація для користувачів та адміністраторів системи.`,
    canonicalPath: routeKeys.documentation,
});

export default async function DocumentationPage() {
    return <Documentation />;
}
