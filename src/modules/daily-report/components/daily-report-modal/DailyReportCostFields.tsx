import { Control, FieldErrors } from "react-hook-form";
import { ResourceInputField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-input-field/ResourceInputField";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { dailyReportLabels } from "@/modules/daily-report/constants/daily-report-labels";
import { dailyReportProps } from "@/modules/daily-report/constants/daily-report-props";
import { DailyReport } from "@/modules/daily-report/types/daily-report";

interface DailyReportCostFieldsProps {
    control: Control<DailyReport>;
    errors: FieldErrors<DailyReport>;
}

export function DailyReportCostFields({ control, errors }: DailyReportCostFieldsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ResourceInputField
                field={{
                    name: dailyReportProps.costOfGoods as keyof DailyReport,
                    label: dailyReportLabels.costOfGoods,
                    type: resourceFieldTypes.number,
                    required: true,
                }}
                control={control}
                errors={errors}
            />
            <ResourceInputField
                field={{
                    name: dailyReportProps.productWriteOffs as keyof DailyReport,
                    label: dailyReportLabels.productWriteOffs,
                    type: resourceFieldTypes.number,
                    required: true,
                }}
                control={control}
                errors={errors}
            />
        </div>
    );
}
