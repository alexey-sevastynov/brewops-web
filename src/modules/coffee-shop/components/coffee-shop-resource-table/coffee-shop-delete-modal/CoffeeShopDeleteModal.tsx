import { useState } from "react";
import { Button } from "@/shared/ui/button/Button";
import { MRInput } from "@/shared/ui/input/Input";
import { Text } from "@/shared/ui/typography/text/Text";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { VoidFunc, VoidFuncNoParam } from "@/shared/types/getter-setter-functions";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";

interface CoffeeShopDeleteModalProps {
    coffeeShop: CoffeeShop;
    open: boolean;
    loading: boolean;
    onOpenChange: VoidFunc<boolean>;
    onConfirm: VoidFuncNoParam;
}

export function CoffeeShopDeleteModal({
    coffeeShop,
    open,
    loading,
    onOpenChange,
    onConfirm,
}: CoffeeShopDeleteModalProps) {
    const [confirmInput, setConfirmInput] = useState("");

    const handleOpenChange = (value: boolean) => {
        onOpenChange(value);

        if (!value) {
            setConfirmInput("");
        }
    };

    return (
        <ModalWindow
            open={open}
            onOpenChange={handleOpenChange}
            title="Небезпечна дія: Видалення кав'ярні"
            size="md"
        >
            <div className="space-y-6">
                <div className="space-y-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
                    <Text>
                        Увага: Каскадне видалення даних! Видалення кав&apos;ярні{" "}
                        <strong>{coffeeShop.name}</strong> призведе до безповоротного видалення{" "}
                        <strong>ВСІХ пов&apos;язаних даних</strong> в системі.
                    </Text>
                </div>

                <div className="space-y-3">
                    <Text>Для підтвердження видалення введіть назву кав&apos;ярні:</Text>

                    <strong className="bg-muted border-border block w-fit rounded-lg border px-2.5 py-1 font-mono text-base text-rose-500 select-all">
                        {coffeeShop.name}
                    </strong>

                    <MRInput
                        label="Введіть назву кав'ярні"
                        value={confirmInput}
                        onChange={(event) => setConfirmInput(event.target.value)}
                        placeholder={coffeeShop.name}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant={buttonVariantKeys.secondary}
                        onClick={() => handleOpenChange(false)}
                        text="Скасувати"
                        className="h-10 text-sm"
                    />

                    <Button
                        type="button"
                        variant={buttonVariantKeys.danger}
                        disabled={!(confirmInput === coffeeShop.name)}
                        onClick={onConfirm}
                        loading={loading}
                        text="Видалити назавжди"
                        className="h-10 text-sm"
                    />
                </div>
            </div>
        </ModalWindow>
    );
}
