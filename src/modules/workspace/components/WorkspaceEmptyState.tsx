export function WorkspaceEmptyState() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="border-border rounded-2xl border p-8 text-center">
                <h1 className="text-2xl font-semibold">Workspace не знайдено</h1>

                <p className="text-muted-foreground mt-2">
                    Спочатку створіть або виберіть workspace, щоб продовжити роботу.
                </p>
            </div>
        </div>
    );
}
