import { apiClient } from "@/shared/lib/axios";

export async function getAll<T>(endpoint: string) {
    const { data } = await apiClient.get<T[]>(endpoint);

    return data;
}

export async function createOne<TRequest, TResponse = TRequest>(endpoint: string, body: TRequest) {
    const response = await apiClient.post(endpoint, body);

    return response.data as TResponse;
}

export async function getOne<T>(endpoint: string, id: string) {
    const { data } = await apiClient.get<T>(`${endpoint}/${id}`);

    return data;
}

export async function deleteOne<T>(endpoint: string, id: string) {
    const { data } = await apiClient.delete<T>(`${endpoint}/${id}`);

    return data;
}

export async function updateOne<TRequest, TResponse = TRequest>(
    endpoint: string,
    id: string,
    body: TRequest,
) {
    const { data } = await apiClient.patch<TResponse>(`${endpoint}/${id}`, body);

    return data;
}
