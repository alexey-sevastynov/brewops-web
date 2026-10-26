"use client";

import { useEffect, useMemo, useState } from "react";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { Button } from "@/shared/ui/button/Button";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { DailyReport } from "@/modules/daily-report/types/daily-report";
import { dailyReportColumns } from "@/modules/daily-report/configs/daily-report-columns";
import { createDailyReportActionsColumn } from "@/modules/daily-report/configs/daily-report-actions";
import { useCoffeeShopResourcePermissions } from "@/modules/coffee-shop/hooks/use-coffee-shop-resource-permissions";
import { resourceNames } from "@/shared/constants/resource-names";
import { deleteDailyReport, getAllDailyReports } from "@/modules/daily-report/model/daily-report-thunks";
import { routeLabels } from "@/shared/constants/route-labels";
import { canManageCoffeeShopResource } from "@/modules/coffee-shop/utils/coffee-shop-permissions";
import { DailyReportModal } from "@/modules/daily-report/components/daily-report-modal/DailyReportModal";

export function DailyReportResourceTable({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const reports = useAppSelector((state) => state.dailyReport.data);
    const isLoadingReports = useAppSelector((state) => state.dailyReport.loading);
    const coffeeShopResourcePermissions = useCoffeeShopResourcePermissions(
        coffeeShopId,
        resourceNames.dailyReports,
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReport, setEditingReport] = useState<DailyReport | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllDailyReports(coffeeShopId));
    }, [dispatch, coffeeShopId]);

    const handleCreateClick = () => {
        setEditingReport(undefined);
        setIsModalOpen(true);
    };

    const handleEditClick = (report: DailyReport) => {
        setEditingReport(report);
        setIsModalOpen(true);
    };

    const highlightDates = useMemo(() => {
        return reports.map((report) => new Date(report.date));
    }, [reports]);

    return (
        <>
            <ResourceTable<DailyReport>
                title={routeLabels.dailyReports}
                data={reports}
                isLoading={isLoadingReports}
                columns={dailyReportColumns}
                createActionsColumn={
                    canManageCoffeeShopResource(coffeeShopResourcePermissions)
                        ? (onDelete) =>
                              createDailyReportActionsColumn(onDelete, handleEditClick, {
                                  canWrite: coffeeShopResourcePermissions.canWrite,
                                  canDelete: coffeeShopResourcePermissions.canDelete,
                              })
                        : undefined
                }
                onDelete={
                    coffeeShopResourcePermissions.canDelete
                        ? async (id) => {
                              await dispatch(deleteDailyReport({ coffeeShopId, id })).unwrap();
                          }
                        : undefined
                }
                deleteConfirmDescription="Ви дійсно хочете видалити цей щоденний звіт?"
                exportConfig={{
                    fileName: "daily-reports",
                    sheetName: routeLabels.dailyReports,
                }}
                stickyHeader={true}
            >
                {coffeeShopResourcePermissions.canWrite && (
                    <Button iconName={iconNames.plus} text="Додати звіт" onClick={handleCreateClick} />
                )}
            </ResourceTable>

            <DailyReportModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                coffeeShopId={coffeeShopId}
                reportToEdit={editingReport}
                highlightDates={highlightDates}
            />
        </>
    );
}
