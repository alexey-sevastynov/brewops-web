"use client";

import { useEffect } from "react";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { getTodayDate } from "@/shared/utils/date";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { createDailyReportActionsColumn } from "@/modules/daily-report/configs/daily-report-actions";
import { dailyReportColumns } from "@/modules/daily-report/configs/daily-report-columns";
import { useDailyReportFormFields } from "@/modules/daily-report/components/daily-report-resource-table/use-daily-report-form-fields";
import {
    createDailyReport,
    deleteDailyReport,
    getAllDailyReports,
    updateDailyReport,
} from "@/modules/daily-report/model/daily-report-thunks";

export function DailyReportResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state) => state.dailyReport.data);
    const isLoadingReports = useAppSelector((state) => state.dailyReport.loading);

    useEffect(() => {
        dispatch(getAllDailyReports(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    const dailyReportFormFields = useDailyReportFormFields({ coffeeShopId });

    return (
        <ResourceTable<DailyReport>
            title="Щоденні звіти"
            data={reports}
            isLoading={isLoadingReports}
            columns={dailyReportColumns}
            formFields={dailyReportFormFields}
            createActionsColumn={createDailyReportActionsColumn}
            defaultValues={{ date: getTodayDate() }}
            addButtonLabel="Додати звіт"
            createTitle="Створити щоденний звіт"
            editTitle="Редагувати щоденний звіт"
            deleteConfirmDescription="Ви дійсно хочете видалити цей щоденний звіт?"
            onCreate={async (dailyReport) => {
                await dispatch(createDailyReport({ coffeeShopId, dailyReport })).unwrap();
                await dispatch(getAllDailyReports(coffeeShopId));
            }}
            onUpdate={async (dailyReport) => {
                await dispatch(updateDailyReport({ coffeeShopId, dailyReport })).unwrap();
                await dispatch(getAllDailyReports(coffeeShopId));
            }}
            onDelete={async (id) => {
                await dispatch(deleteDailyReport({ coffeeShopId, id })).unwrap();
            }}
            exportConfig={{
                fileName: "daily-reports",
                sheetName: "Щоденні звіти",
            }}
            stickyHeader={true}
        />
    );
}
