export function getSearchParam(searchParams: URLSearchParams, name: string) {
    return searchParams.get(name) ?? undefined;
}
