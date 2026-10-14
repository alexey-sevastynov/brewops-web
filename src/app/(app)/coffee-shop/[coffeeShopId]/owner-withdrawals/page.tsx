import { createMetadata } from "@/shared/utils/seo/create-metadata";
import { routeKeys } from "@/shared/constants/route-keys";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { routeLabels } from "@/shared/constants/route-labels";
import { resourceNames } from "@/shared/constants/resource-names";
import { CoffeeShopBreadcrumbs } from "@/modules/coffee-shop/components/CoffeeShopBreadcrumbs";
import { OwnerWithdrawal } from "@/modules/owner-withdrawal/components/page/OwnerWithdrawal";

interface OwnerWithdawalsPageProps {
    params: Promise<WithCoffeeShopId>;
}

export async function generateMetadata({ params }: OwnerWithdawalsPageProps) {
    const ownerWithdrawalParams = await params;

    return createMetadata({
        title: "Виведення коштів власником",
        resourceName: resourceNames.ownerWithdrawals,
        description: "Контролюйте виведення коштів власником: дату, суму та короткий опис операції.",
        canonicalPath: routeKeys.ownerWithdrawals(ownerWithdrawalParams.coffeeShopId),
    });
}

export default async function OwnerWithdrawalsPage({ params }: OwnerWithdawalsPageProps) {
    const ownerWithdrawalParams = await params;

    return (
        <>
            <CoffeeShopBreadcrumbs
                coffeeShopId={ownerWithdrawalParams.coffeeShopId}
                currentLabel={routeLabels.ownerWithdrawals}
            />
            <OwnerWithdrawal coffeeShopId={ownerWithdrawalParams.coffeeShopId} />
        </>
    );
}
