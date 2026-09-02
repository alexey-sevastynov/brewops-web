export const apiEndpointNames = {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    forgotPasswordConfirm: "/password-reset/confirm",
    forgotPasswordRequest: "/password-reset/request",
    mailVerification: "/mail-verification/confirm",
    employees: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/employees`,
    dailyReports: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/daily-reports`,
    expenseReports: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/expense-reports`,
    facilityExpenses: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/facility-expenses`,
    inventoryAudits: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/inventory-audits`,
    ownerWithdrawals: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/owner-withdrawals`,
    kavappCatalog: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/kavapp/catalog`,
    kavappInventory: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/kavapp/inventory`,
    kavappSync: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/kavapp/sync`,
    kavappSnapshotsLatest: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/kavapp/snapshots/latest`,
    kavappInventoryAlertRules: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/kavapp/alert-rules`,
    statistics: (coffeeShopId: string) => `/coffee-shops/${coffeeShopId}/statistics`,
    workspaces: "/workspaces",
} as const;

export function getWorkspaceCoffeeShopsEndpoint(_workspaceId: string) {
    return "/coffee-shops";
}
