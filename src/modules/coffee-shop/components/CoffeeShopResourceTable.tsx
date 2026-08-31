"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { CoffeeShop } from "@/modules/coffee-shop/coffee-shop-types";
import {
    createCoffeeShop,
    getCoffeeShops,
    updateCoffeeShop,
    deleteCoffeeShop,
} from "@/modules/coffee-shop/coffee-shop-thunks";
import {
    coffeeShopColumns,
    coffeeShopFormFields,
    createCoffeeShopActionsColumn,
} from "@/modules/coffee-shop/coffee-shop-config";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { routeKeys } from "@/shared/constants/route-keys";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { MRInput } from "@/shared/ui/input/Input";
import { ShieldAlert } from "lucide-react";

// eslint-disable-next-line max-lines-per-function
export function CoffeeShopResourceTable() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const coffeeShops = useAppSelector((state) => state.coffeeShop.coffeeShops);
    const isLoading = useAppSelector((state) => state.coffeeShop.isLoading);
    const error = useAppSelector((state) => state.coffeeShop.error);

    const [deletingShopId, setDeletingShopId] = useState<string | null>(null);
    const [confirmInput, setConfirmInput] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    const activeDeletingShop = coffeeShops.find((shop) => shop._id === deletingShopId);

    const handleDeleteConfirm = async () => {
        if (!deletingShopId || !workspaceId) return;

        setDeleteLoading(true);

        try {
            await dispatch(deleteCoffeeShop(deletingShopId)).unwrap();
            setDeletingShopId(null);
            setConfirmInput("");
            await dispatch(getCoffeeShops(workspaceId));
        } catch (err) {
            console.error("Failed to delete coffee shop", err);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (!workspaceId) {
        return <div className="border-border rounded-xl border p-6">Завантаження workspace...</div>;
    }

    return (
        <div className="space-y-4">
            {error?.statusCode === 403 && (
                <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-4">
                    <p>{error.message}</p>
                    <Button
                        className="mt-3"
                        text="Змінити тариф"
                        onClick={() => router.push(routeKeys.plan)}
                    />
                </div>
            )}

            <ResourceTable<CoffeeShop>
                title="Кавʼярні workspace"
                data={coffeeShops}
                isLoading={isLoading}
                columns={coffeeShopColumns}
                formFields={coffeeShopFormFields}
                createActionsColumn={(_, onEdit) =>
                    createCoffeeShopActionsColumn((id) => setDeletingShopId(id), onEdit)
                }
                defaultValues={{ isActive: true }}
                addButtonLabel="Додати кавʼярню"
                createTitle="Створити кавʼярню"
                editTitle="Редагувати кавʼярню"
                onCreate={async (coffeeShop) => {
                    await dispatch(createCoffeeShop({ workspaceId, coffeeShop })).unwrap();
                    await dispatch(getCoffeeShops(workspaceId));
                }}
                onUpdate={async (coffeeShop) => {
                    await dispatch(updateCoffeeShop({ workspaceId, coffeeShop })).unwrap();
                    await dispatch(getCoffeeShops(workspaceId));
                }}
                exportConfig={{ fileName: "coffee-shops", sheetName: "Кавʼярні" }}
            />

            <ModalWindow
                open={!!deletingShopId}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingShopId(null);
                        setConfirmInput("");
                    }
                }}
                title="Небезпечна дія: Видалення кав'ярні"
                size="md"
            >
                <div className="space-y-6">
                    <div className="space-y-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-500">
                        <div className="flex items-center gap-2 font-bold uppercase">
                            <ShieldAlert size={20} />
                            Увага: Каскадне видалення даних!
                        </div>
                        <p>
                            Видалення кав&apos;ярні <strong>{activeDeletingShop?.name}</strong> призведе до
                            безповоротного видалення
                            <strong> ВСІХ пов&apos;язаних даних</strong> в системі:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Звіти змін (доходи, калькуляція, рентабельність)</li>
                            <li>Звіти та плани витрат, комунальні платежі, оренда</li>
                            <li>Дані про співробітників, їх зарплати та премії</li>
                            <li>Аудити складу,snapshots залишків та правила сповіщень</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <p className="text-foreground text-sm">
                            Для підтвердження видалення введіть назву кав&apos;ярні
                            <strong className="bg-muted border-border mt-1 block w-fit rounded-lg border px-2.5 py-1 font-mono text-base text-rose-500 select-all">
                                {activeDeletingShop?.name}
                            </strong>
                        </p>
                        <MRInput
                            label="Введіть назву кав'ярні"
                            value={confirmInput}
                            onChange={(e) => setConfirmInput(e.target.value)}
                            placeholder={activeDeletingShop?.name}
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant={buttonVariantKeys.secondary}
                            onClick={() => {
                                setDeletingShopId(null);
                                setConfirmInput("");
                            }}
                            text="Скасувати"
                            className="h-10 text-sm"
                        />
                        <Button
                            type="button"
                            variant={buttonVariantKeys.danger}
                            disabled={confirmInput !== activeDeletingShop?.name}
                            onClick={handleDeleteConfirm}
                            loading={deleteLoading}
                            text="Видалити назавжди"
                            className="h-10 text-sm"
                        />
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
}
