"use client";

import { VoidFunc } from "@/shared/types/getter-setter-functions";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import {
    getModalTitle,
    getSubmitButtonLabel,
    useDailyReportModal,
} from "@/modules/daily-report/components/daily-report-modal/DailyReportModal.funcs";
import { DailyReportKavappBanner } from "@/modules/daily-report/components/daily-report-modal/DailyReportKavappBanner";
import { DailyReportModalFooter } from "@/modules/daily-report/components/daily-report-modal/DailyReportModalFooter";
import { DailyReportFormFields } from "@/modules/daily-report/components/daily-report-modal/DailyReportFormFields";

interface DailyReportModalProps {
    open: boolean;
    onOpenChange: VoidFunc<boolean>;
    coffeeShopId: string;
    reportToEdit?: DailyReport;
    highlightDates?: Date[];
}

export function DailyReportModal({
    open,
    onOpenChange,
    coffeeShopId,
    reportToEdit,
    highlightDates,
}: DailyReportModalProps) {
    const {
        isEdit,
        canSyncKavapp,
        employeeOptions,
        control,
        errors,
        isSyncing,
        isSubmitting,
        handleKavappSync,
        handleSubmit,
    } = useDailyReportModal({
        open,
        coffeeShopId,
        reportToEdit,
        onClose: () => onOpenChange(false),
    });

    return (
        <ModalWindow
            open={open}
            onOpenChange={onOpenChange}
            title={getModalTitle(isEdit)}
            size="md"
            closeOnOutsideClick={false}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {canSyncKavapp && <DailyReportKavappBanner onSync={handleKavappSync} isSyncing={isSyncing} />}
                <DailyReportFormFields
                    control={control}
                    errors={errors}
                    highlightDates={highlightDates}
                    employeeOptions={employeeOptions}
                />
                <DailyReportModalFooter
                    onCancel={() => onOpenChange(false)}
                    isSubmitting={isSubmitting}
                    submitLabel={getSubmitButtonLabel(isEdit)}
                />
            </form>
        </ModalWindow>
    );
}
