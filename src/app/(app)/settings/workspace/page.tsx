import { CoffeeShopResourceTable } from "@/modules/coffee-shop/components/CoffeeShopResourceTable";
import { WorkspaceMembersTable } from "@/modules/workspace/components/WorkspaceMembersTable";

export default function WorkspaceSettingsPage() {
    return (
        <div className="space-y-10">
            <WorkspaceMembersTable />
            <CoffeeShopResourceTable />
        </div>
    );
}
