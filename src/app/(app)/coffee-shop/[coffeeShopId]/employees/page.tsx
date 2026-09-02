import { Employees } from "@/modules/employee/components/page/Employees";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { routeKeys } from "@/shared/constants/route-keys";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface EmployeesPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: EmployeesPageProps) {
    const employeePageParams = await params;

    return createMetadata({
        title: "Працівники та персонал",
        resourceName: "Кав'ярня",
        description: "База даних співробітників кав'ярні.",
        canonicalPath: routeKeys.employees(employeePageParams.coffeeShopId),
    });
}

export default async function EmployeesPage({ params }: EmployeesPageProps) {
    const employeePageParams = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        {
            name: "Кав'ярня",
            //  path: routeKeys.coffeeShop(employeePageParams.coffeeShopId)
            path: routeKeys.coffeeShop,
        },
        { name: "Працівники", path: routeKeys.employees(employeePageParams.coffeeShopId) },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(employeePageParams.coffeeShopId) },
                    { label: "Працівники" },
                ]}
            />
            <Employees coffeeShopId={employeePageParams.coffeeShopId} />
        </>
    );
}
