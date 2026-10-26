import { useEffect, useMemo, useState } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { AppDispatch } from "@/store";
import { CoffeeShop } from "@/modules/coffee-shop/types/coffee-shop";
import { Employee } from "@/modules/employee/types/employee";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { formatDateToIsoDate, getTodayDate } from "@/shared/utils/date";
import { appToast } from "@/shared/lib/toast";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { selectCoffeeShopById } from "@/modules/coffee-shop/model/coffee-shop-selectors";
import { getAllEmployees } from "@/modules/employee/model/employee-thunks";
import {
    createDailyReport,
    updateDailyReport,
    getAllDailyReports,
    fetchDailyReportKavappSync,
} from "@/modules/daily-report/model/daily-report-thunks";
import { VoidFunc, VoidFuncNoParam } from "@/shared/types/getter-setter-functions";
import { dailyReportProps } from "@/modules/daily-report/constants/daily-report-props";

export function hasKavappIntegration(coffeeShop?: CoffeeShop): boolean {
    return Boolean(coffeeShop?.kavappEmail?.trim() && coffeeShop?.kavappPointId?.trim());
}

export function getModalTitle(isEdit: boolean): string {
    return isEdit ? "Редагувати щоденний звіт" : "Створити щоденний звіт";
}

export function getSubmitButtonLabel(isEdit: boolean): string {
    return isEdit ? "Зберегти" : "Створити";
}

export function getEmployeeSelectOptions(employees: Employee[]) {
    return employees.map((emp) => ({
        value: emp._id,
        label: emp.name,
    }));
}

export function getInitialFormData(reportToEdit?: DailyReport): Partial<DailyReport> {
    if (!reportToEdit) {
        return {
            date: getTodayDate(),
        };
    }

    return {
        date: reportToEdit.date ? formatDateToIsoDate(reportToEdit.date) : getTodayDate(),
        employee: reportToEdit.employee,
        cashRevenue: reportToEdit.cashRevenue,
        terminalRevenue: reportToEdit.terminalRevenue,
        costOfGoods: reportToEdit.costOfGoods,
        productWriteOffs: reportToEdit.productWriteOffs,
        employeeBonus: reportToEdit.employeeBonus,
    };
}

interface ExecuteKavappSyncParams {
    dispatch: AppDispatch;
    coffeeShopId: string;
    date: string;
    setValue: UseFormSetValue<DailyReport>;
    setIsSyncing: VoidFunc<boolean>;
}

export async function executeKavappSync({
    dispatch,
    coffeeShopId,
    date,
    setValue,
    setIsSyncing,
}: ExecuteKavappSyncParams) {
    try {
        setIsSyncing(true);
        const resolvedDate = date.trim().slice(0, 10) || getTodayDate();
        const data = await dispatch(
            fetchDailyReportKavappSync({ coffeeShopId, date: resolvedDate }),
        ).unwrap();

        setValue(dailyReportProps.cashRevenue as keyof DailyReport, data.cashRevenue, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setValue(dailyReportProps.terminalRevenue as keyof DailyReport, data.terminalRevenue, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setValue(dailyReportProps.costOfGoods as keyof DailyReport, data.costOfGoods, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setValue(dailyReportProps.productWriteOffs as keyof DailyReport, data.productWriteOffs, {
            shouldValidate: true,
            shouldDirty: true,
        });

        appToast.success("Дані з Kavapp успішно завантажено");
    } catch {
        appToast.error("Не вдалося завантажити дані з Kavapp");
    } finally {
        setIsSyncing(false);
    }
}

interface ExecuteReportSubmitParams {
    dispatch: AppDispatch;
    coffeeShopId: string;
    values: DailyReport;
    onSuccess: VoidFuncNoParam;
    setIsSubmitting: VoidFunc<boolean>;
    reportToEdit?: DailyReport;
}

export async function executeReportSubmit({
    dispatch,
    coffeeShopId,
    values,
    reportToEdit,
    onSuccess,
    setIsSubmitting,
}: ExecuteReportSubmitParams) {
    try {
        setIsSubmitting(true);

        const reportPayload: DailyReport = {
            ...values,
            cashRevenue: Number(values.cashRevenue),
            terminalRevenue: Number(values.terminalRevenue),
            costOfGoods: Number(values.costOfGoods),
            productWriteOffs: Number(values.productWriteOffs),
            employeeBonus: values.employeeBonus ? Number(values.employeeBonus) : 0,
        };

        if (reportToEdit) {
            await dispatch(
                updateDailyReport({
                    coffeeShopId,
                    dailyReport: { ...reportToEdit, ...reportPayload },
                }),
            ).unwrap();
        } else {
            await dispatch(
                createDailyReport({
                    coffeeShopId,
                    dailyReport: reportPayload as unknown as Omit<DailyReport, "_id">,
                }),
            ).unwrap();
        }

        await dispatch(getAllDailyReports(coffeeShopId));
        onSuccess();
    } finally {
        setIsSubmitting(false);
    }
}

interface UseDailyReportModalParams {
    open: boolean;
    coffeeShopId: string;
    onClose: VoidFuncNoParam;
    reportToEdit?: DailyReport;
}

export function useDailyReportModal({
    open,
    coffeeShopId,
    reportToEdit,
    onClose,
}: UseDailyReportModalParams) {
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state) => state.employee.data);
    const coffeeShop = useAppSelector((state) => selectCoffeeShopById(state, coffeeShopId));

    const [isSyncing, setIsSyncing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEdit = Boolean(reportToEdit);
    const canSyncKavapp = hasKavappIntegration(coffeeShop);
    const employeeOptions = useMemo(() => getEmployeeSelectOptions(employees), [employees]);

    useEffect(() => {
        if (open) {
            dispatch(getAllEmployees(coffeeShopId));
        }
    }, [open, coffeeShopId, dispatch]);

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<DailyReport>({
        defaultValues: {
            date: getTodayDate(),
        } as DailyReport,
    });

    useEffect(() => {
        if (!open) return;

        reset(getInitialFormData(reportToEdit) as DailyReport);
    }, [open, reportToEdit, reset]);

    const handleKavappSync = () => {
        executeKavappSync({
            dispatch,
            coffeeShopId,
            date: getValues("date"),
            setValue,
            setIsSyncing,
        });
    };

    const handleFormSubmit = handleSubmit((values) => {
        executeReportSubmit({
            dispatch,
            coffeeShopId,
            values,
            reportToEdit,
            onSuccess: onClose,
            setIsSubmitting,
        });
    });

    return {
        isEdit,
        canSyncKavapp,
        employeeOptions,
        control,
        errors,
        isSyncing,
        isSubmitting,
        handleKavappSync,
        handleSubmit: handleFormSubmit,
    };
}
