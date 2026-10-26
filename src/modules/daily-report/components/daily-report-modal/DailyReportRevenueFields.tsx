import { Control, FieldErrors } from "react-hook-form";
import { ResourceInputField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-input-field/ResourceInputField";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { dailyReportLabels } from "@/modules/daily-report/constants/daily-report-labels";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { dailyReportProps } from "@/modules/daily-report/constants/daily-report-props";

interface DailyReportRevenueFieldsProps {
    control: Control<DailyReport>;
    errors: FieldErrors<DailyReport>;
}

export function DailyReportRevenueFields({ control, errors }: DailyReportRevenueFieldsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ResourceInputField
                field={{
                    name: dailyReportProps.cashRevenue as keyof DailyReport,
                    label: dailyReportLabels.cashRevenue,
                    type: resourceFieldTypes.number,
                    required: true,
                }}
                control={control}
                errors={errors}
            />

            <ResourceInputField
                field={{
                    name: dailyReportProps.terminalRevenue as keyof DailyReport,
                    label: dailyReportLabels.terminalRevenue,
                    type: resourceFieldTypes.number,
                    required: true,
                }}
                control={control}
                errors={errors}
            />
        </div>
    );
}
