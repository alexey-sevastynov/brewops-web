import { CoffeeShopResourceTable } from "@/modules/coffee-shop/components/coffee-shop-resource-table/CoffeeShopResourceTable";
import { SettingsBreadcrumbs } from "@/app/(app)/(workspace)/settings/SettingsBreadcrumbs";

export default function CoffeeShopsSettingsPage() {
    return (
        <>
            <SettingsBreadcrumbs currentLabel="Кав'ярні" />
            <CoffeeShopResourceTable />
        </>
    );
}
