import { EntityTimestamps } from "@/shared/types/entity-timestamps";
import { WithObjectId } from "@/shared/types/with-object-id";
import { ExpenseReportType } from "@/modules/expense-report/enums/expense-report-type";

export interface ExpenseReport extends WithObjectId, EntityTimestamps {
    title: string;
    amount: number;
    type: ExpenseReportType;
    date?: string;
    validFrom?: string;
    validTo?: string;
    description?: string;
    receiptUrl?: string;
}
