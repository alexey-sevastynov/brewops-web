import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/modules/auth/model/slice";
import employeeReducer from "@/modules/employee/model/employee-slice";
import dailyReportReducer from "@/modules/daily-report/model/daily-report-slice";
import expenseReportReducer from "@/modules/expense-report/model/expense-report-slice";
import facilityExpenseReducer from "@/modules/facility-expense/model/facility-expense-slice";
import inventoryAuditReducer from "@/modules/inventory-audit/model/inventory-audit-slice";
import ownerWithdrawalReducer from "@/modules/owner-withdrawal/model/owner-withdrawal-slice";
import statisticsReducers from "@/modules/statistics/model/statistics-slice";
import kavappInventoryReducer from "@/modules/kavapp-inventory/model/kavapp-inventory-slice";
import inventoryAlertRuleReducer from "@/modules/kavapp-inventory-alert-rules/model/inventory-alert-rule-slice";
import workspaceReducer from "@/modules/workspace/workspace-slice";
import coffeeShopReducer from "@/modules/coffee-shop/coffee-shop-slice";
import { toastMiddleware } from "@/toast-middleware";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
        dailyReport: dailyReportReducer,
        expenseReport: expenseReportReducer,
        facilityExpense: facilityExpenseReducer,
        inventoryAudit: inventoryAuditReducer,
        ownerWithdrawal: ownerWithdrawalReducer,
        statistics: statisticsReducers,
        kavappInventory: kavappInventoryReducer,
        inventoryAlertRules: inventoryAlertRuleReducer,
        workspace: workspaceReducer,
        coffeeShop: coffeeShopReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(toastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
