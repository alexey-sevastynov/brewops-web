import { resourceNames } from "@/shared/constants/resource-names";
import { permissionActions } from "@/shared/enums/permission-action";

export const defaultPermissions = [
    `${resourceNames.dailyReports}:${permissionActions.read}`,
    `${resourceNames.dailyReports}:${permissionActions.write}`,
    `${resourceNames.expenseReports}:${permissionActions.read}`,
    `${resourceNames.expenseReports}:${permissionActions.write}`,
];
