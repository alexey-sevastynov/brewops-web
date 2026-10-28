import { EntityTimestamps } from "@/shared/types/entity-timestamps";
import { WithObjectId } from "@/shared/types/with-object-id";

export interface FacilityExpense extends WithObjectId, EntityTimestamps {
    title: string;
    amount: number;
    date: string;
    period: string;
    description?: string;
    receiptUrl?: string;
}
