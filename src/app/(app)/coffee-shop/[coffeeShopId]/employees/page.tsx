import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { Employees } from "@/modules/employee/components/page/Employees";

interface EmployeesPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: { params: Promise<WithCoffeeShopId> }) {
    const employeePageParams = await params;

    return createMetadata({
        title: routeLabels.employees,
        resourceName: resourceNames.employees,
        description:
            "Дані про працівників кав'ярні: посади, контакти, дати працевлаштування та статус роботи.",
        canonicalPath: routeKeys.employees(employeePageParams.coffeeShopId),
    });
}

export default async function EmployeesPage({ params }: EmployeesPageProps) {
    const employeePageParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={employeePageParams.coffeeShopId}
                currentLabel={routeLabels.employees}
            />
            <Employees coffeeShopId={employeePageParams.coffeeShopId} />
        </>
    );
}
