import { EntityTimestamps } from "@/shared/types/entity-timestamps";
import { WithObjectId } from "@/shared/types/with-object-id";

export interface InventoryAudit extends WithObjectId, EntityTimestamps {
    title: string;
    shortageAmount: number;
    surplusAmount: number;
    validFrom: string;
    validTo: string;
    description?: string;
    receiptUrl?: string;
}
