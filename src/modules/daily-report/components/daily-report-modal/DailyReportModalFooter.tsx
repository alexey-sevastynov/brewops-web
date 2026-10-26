import { VoidFuncNoParam } from "@/shared/types/getter-setter-functions";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";

interface DailyReportModalFooterProps {
    onCancel: VoidFuncNoParam;
    isSubmitting: boolean;
    submitLabel: string;
}

export function DailyReportModalFooter({ onCancel, isSubmitting, submitLabel }: DailyReportModalFooterProps) {
    return (
        <div className="border-border/40 mt-6 flex justify-end gap-3 border-t pt-3">
            <Button type="button" variant={buttonVariantKeys.secondary} onClick={onCancel} text="Скасувати" />
            <Button
                type="submit"
                variant={buttonVariantKeys.primary}
                loading={isSubmitting}
                text={submitLabel}
            />
        </div>
    );
}
