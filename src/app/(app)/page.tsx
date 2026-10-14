import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { AppHomePage } from "@/app/(app)/AppHomePage";

export const metadata = createMetadata({
    title: "BrewOps — управління кав'ярнями",
    resourceName: "BrewOps",
    description: `SaaS-платформа для управління кав'ярнями: облік торгових точок і співробітників, 
        щоденні звіти та витрати, аналіз доходів, витрат і чистого прибутку.`,
    canonicalPath: routeKeys.home,
});

export default function Page() {
    return <AppHomePage />;
}
