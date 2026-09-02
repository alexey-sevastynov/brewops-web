import { apiClient } from "@/shared/lib/axios";
import { apiEndpointNames } from "@/shared/constants/api-endpoint-name";
import {
    KavappInventoryResponse,
    KavappInventorySnapshot,
} from "@/modules/kavapp-inventory/types/kavapp-inventory-response";
import { KavappCatalogItem } from "@/modules/kavapp-inventory/types/kavapp-catalog-item";

export async function fetchKavappCatalog(coffeeShopId: string) {
    const { data } = await apiClient.get<KavappCatalogItem[]>(apiEndpointNames.kavappCatalog(coffeeShopId));

    return data;
}

export async function fetchKavappInventory(coffeeShopId: string, pointId?: string) {
    const params = pointId ? { params: { pointId } } : undefined;

    const { data } = await apiClient.get<KavappInventoryResponse>(
        apiEndpointNames.kavappInventory(coffeeShopId),
        params,
    );

    return data;
}

export async function syncKavappInventory(coffeeShopId: string, pointId?: string, testAlert?: boolean) {
    const params: Record<string, string> = {};

    if (pointId) params.pointId = pointId;

    if (testAlert) params.testAlert = "true";

    const { data } = await apiClient.post<unknown>(apiEndpointNames.kavappSync(coffeeShopId), null, {
        params,
    });

    return data;
}

export async function fetchLatestKavappSnapshot(coffeeShopId: string) {
    const { data } = await apiClient.get<KavappInventorySnapshot>(
        apiEndpointNames.kavappSnapshotsLatest(coffeeShopId),
    );

    return data;
}
