import { OwnerWithdrawal } from "@/modules/owner-withdrawal/components/page/OwnerWithdrawal";
import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { JsonLd } from "@/shared/ui/seo/JsonLd";
import { routeKeys } from "@/shared/constants/route-keys";
import { generateBreadcrumbSchema } from "@/shared/utils/seo/shema/generate-breadcrumb";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs/Breadcrumbs";

interface OwnerWithdawalsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: OwnerWithdawalsPageProps) {
    const ownerWithdrawalParams = await params;

    return createMetadata({
        title: "Виведення коштів власником",
        resourceName: "Кав'ярня",
        description: "Контролюйте виведення коштів власником: дату, суму та короткий опис операції.",
        canonicalPath: routeKeys.ownerWithdrawals(ownerWithdrawalParams.coffeeShopId),
    });
}

export default async function OwnerWithdrawalsPage({ params }: OwnerWithdawalsPageProps) {
    const ownerWithdrawalParams = await params;

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Кав'ярня", path: routeKeys.coffeeShop },
        {
            name: "Виведення коштів власником",
            path: routeKeys.ownerWithdrawals(ownerWithdrawalParams.coffeeShopId),
        },
    ]);

    return (
        <>
            <JsonLd schema={breadcrumbSchema} />
            <Breadcrumbs
                items={[
                    { label: "Головна", href: "/" },
                    { label: "Кавʼярня", href: routeKeys.coffeeShopHome(ownerWithdrawalParams.coffeeShopId) },
                    { label: "Виведення коштів власником" },
                ]}
            />
            <OwnerWithdrawal coffeeShopId={ownerWithdrawalParams.coffeeShopId} />
        </>
    );
}
