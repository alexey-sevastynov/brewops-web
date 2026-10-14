"use client";

import { useEffect } from "react";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { getTodayDate } from "@/shared/utils/date";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { dailyReportColumns } from "@/modules/daily-report/configs/daily-report-columns";
import { createDailyReportActionsColumn } from "@/modules/daily-report/configs/daily-report-actions";
import { useDailyReportFormFields } from "@/modules/daily-report/components/daily-report-resource-table/use-daily-report-form-fields";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { resourceNames } from "@/shared/constants/resource-names";
import {
    createDailyReport,
    deleteDailyReport,
    getAllDailyReports,
    updateDailyReport,
} from "@/modules/daily-report/model/daily-report-thunks";
import { routeLabels } from "@/shared/constants/route-labels";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";

export function DailyReportResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state) => state.dailyReport.data);
    const isLoadingReports = useAppSelector((state) => state.dailyReport.loading);
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.dailyReports,
    );

    useEffect(() => {
        dispatch(getAllDailyReports(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    const dailyReportFormFields = useDailyReportFormFields({ coffeeShopId });

    return (
        <ResourceTable<DailyReport>
            title={routeLabels.dailyReports}
            data={reports}
            isLoading={isLoadingReports}
            columns={dailyReportColumns}
            formFields={dailyReportFormFields}
            createActionsColumn={
                canManageCoffeeShopResource(coffeeShopResourcePermissions)
                    ? (onDelete, onEdit) =>
                          createDailyReportActionsColumn(onDelete, onEdit, {
                              canWrite: coffeeShopResourcePermissions.canWrite,
                              canDelete: coffeeShopResourcePermissions.canDelete,
                          })
                    : undefined
            }
            defaultValues={{ date: getTodayDate() }}
            addButtonLabel={coffeeShopResourcePermissions.canWrite ? "Додати звіт" : undefined}
            createTitle="Створити щоденний звіт"
            editTitle="Редагувати щоденний звіт"
            deleteConfirmDescription="Ви дійсно хочете видалити цей щоденний звіт?"
            onCreate={
                coffeeShopResourcePermissions.canWrite
                    ? async (dailyReport) => {
                          await dispatch(createDailyReport({ coffeeShopId, dailyReport })).unwrap();
                          await dispatch(getAllDailyReports(coffeeShopId));
                      }
                    : undefined
            }
            onUpdate={
                coffeeShopResourcePermissions.canWrite
                    ? async (dailyReport) => {
                          await dispatch(updateDailyReport({ coffeeShopId, dailyReport })).unwrap();
                          await dispatch(getAllDailyReports(coffeeShopId));
                      }
                    : undefined
            }
            onDelete={
                coffeeShopResourcePermissions.canDelete
                    ? async (id) => {
                          await dispatch(deleteDailyReport({ coffeeShopId, id })).unwrap();
                      }
                    : undefined
            }
            exportConfig={{
                fileName: "daily-reports",
                sheetName: routeLabels.dailyReports,
            }}
            stickyHeader={true}
        />
    );
}
