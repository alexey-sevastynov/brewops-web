import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { ResourceField } from "@/shared/types/resource-field";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { getAllEmployees } from "@/modules/employee/model/employee-thunks";
import { dailyReportFormFields } from "@/modules/daily-report/configs/daily-report-form-fields";

export function useDailyReportFormFields({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state) => state.employee.data);
    const dailyReports = useAppSelector((state) => state.dailyReport.data);

    useEffect(() => {
        dispatch(getAllEmployees(coffeeShopId));
    }, [dispatch]);

    const employeeOptions = useMemo(() => {
        return employees.map((e) => ({ value: e._id, label: e.name }));
    }, [employees]);

    const highlightDates = useMemo(() => {
        return dailyReports.map((report) => new Date(report.date));
    }, [dailyReports]);

    const fieldsWithDynamicOptions: ResourceField<DailyReport>[] = useMemo(() => {
        return dailyReportFormFields.map((field) => {
            if (field.name === "employee") {
                return { ...field, options: employeeOptions };
            }

            if (field.name === "date") {
                return { ...field, highlightDates };
            }

            return field;
        });
    }, [employeeOptions, highlightDates]);

    return fieldsWithDynamicOptions;
}
