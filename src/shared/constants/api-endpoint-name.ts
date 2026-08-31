export const apiEndpointNames = {
    tasks: "/tasks",
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    forgotPasswordConfirm: "/password-reset/confirm",
    forgotPasswordRequest: "/password-reset/request",
    mailVerification: "/mail-verification/confirm",
    employee: "/coffee-shop/employees",
    dailyReport: "/coffee-shop/daily-reports",
    expenseReport: "/coffee-shop/expense-reports",
    inventoryAudit: "/coffee-shop/inventory-audits",
    statistics: "/coffee-shop/statistics",
    facilityExpense: "/coffee-shop/facility-expenses",
    ownerWithdrawal: "/coffee-shop/owner-withdrawals",
    kavappInventory: "/coffee-shop/kavapp/inventory",
    kavappCatalog: "/coffee-shop/kavapp/catalog",
    kavappSync: "/coffee-shop/kavapp/sync",
    kavappSnapshotsLatest: "/coffee-shop/kavapp/snapshots/latest",
    kavappInventoryAlertRules: "/coffee-shop/kavapp/alert-rules",
    workspaces: "/workspaces",
} as const;

export function getWorkspaceCoffeeShopsEndpoint(_workspaceId: string) {
    return "/coffee-shops";
}
