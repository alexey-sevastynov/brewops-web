import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { routeKeys } from "@/shared/constants/route-keys";
import { Documentation } from "@/modules/documentation/components/page/Documentation";

export const metadata = createMetadata({
    title: "Документація",
    resourceName: "Документація",
    description: `Документація для користувачів та адміністраторів системи.`,
    canonicalPath: routeKeys.documentation,
});

export default async function DocumentationPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Документація", path: routeKeys.documentation },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Documentation />
        </>
    );
}
