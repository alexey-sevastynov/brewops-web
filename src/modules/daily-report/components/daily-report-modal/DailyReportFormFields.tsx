import { Control, FieldErrors } from "react-hook-form";
import { ResourceDateField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-date-field/ResourceDateField";
import { ResourceSelectField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-select-field/ResourceSelectField";
import { ResourceInputField } from "@/shared/ui/form/resource-form-modal/resource-form/resource-input-field/ResourceInputField";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { dailyReportLabels } from "@/modules/daily-report/constants/daily-report-labels";
import { Option } from "@/shared/types/ui/option";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { DailyReportRevenueFields } from "@/modules/daily-report/components/daily-report-modal/DailyReportRevenueFields";
import { DailyReportCostFields } from "@/modules/daily-report/components/daily-report-modal/DailyReportCostFields";
import { dailyReportProps } from "@/modules/daily-report/constants/daily-report-props";

interface DailyReportFormFieldsProps {
    control: Control<DailyReport>;
    errors: FieldErrors<DailyReport>;
    highlightDates?: Date[];
    employeeOptions: Option[];
}

export function DailyReportFormFields({
    control,
    errors,
    highlightDates,
    employeeOptions,
}: DailyReportFormFieldsProps) {
    return (
        <>
            <ResourceDateField
                field={{
                    name: dailyReportProps.date as keyof DailyReport,
                    label: dailyReportLabels.date,
                    type: resourceFieldTypes.date,
                    required: true,
                    highlightDates,
                }}
                control={control}
                errors={errors}
            />

            <ResourceSelectField
                field={{
                    name: dailyReportProps.employee as keyof DailyReport,
                    label: dailyReportLabels.employee,
                    type: resourceFieldTypes.select,
                    required: true,
                    options: employeeOptions,
                }}
                control={control}
                errors={errors}
            />

            <DailyReportRevenueFields control={control} errors={errors} />
            <DailyReportCostFields control={control} errors={errors} />

            <ResourceInputField
                field={{
                    name: dailyReportProps.employeeBonus as keyof DailyReport,
                    label: dailyReportLabels.employeeBonus,
                    type: resourceFieldTypes.number,
                }}
                control={control}
                errors={errors}
            />
        </>
    );
}
