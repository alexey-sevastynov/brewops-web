"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { Button } from "@/shared/ui/button/Button";
import { changeWorkspacePlan } from "@/modules/workspace/workspace-thunks";
import { WorkspacePlanKey, workspacePlanKeys } from "@/modules/workspace/workspace-types";
import { routeKeys } from "@/shared/constants/route-keys";
import { cn } from "@/shared/lib/cn";

const plans = [
    {
        key: workspacePlanKeys.free,
        name: "FREE",
        price: "$0",
        features: ["1 кавʼярня", "5 працівників", "30 днів історії"],
    },
    {
        key: workspacePlanKeys.pro,
        name: "PRO",
        price: "$29",
        features: ["5 кавʼярень", "25 працівників", "365 днів історії"],
    },
    {
        key: workspacePlanKeys.business,
        name: "BUSINESS",
        price: "$79",
        features: ["Необмежені кавʼярні", "Необмежені працівники", "Необмежена історія"],
    },
] as const;

// eslint-disable-next-line max-lines-per-function
export function PlanSelection() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const workspaceId = useAppSelector((state) => state.workspace.selectedWorkspaceId);
    const workspace = useAppSelector((state) =>
        state.workspace.workspaces.find(({ _id }) => _id === state.workspace.selectedWorkspaceId),
    );
    const isLoading = useAppSelector((state) => state.workspace.isLoading);
    const error = useAppSelector((state) => state.workspace.error);

    const selectPlan = async (planKey: WorkspacePlanKey) => {
        if (!workspaceId || planKey !== workspacePlanKeys.free) return;

        await dispatch(changeWorkspacePlan({ workspaceId, planKey })).unwrap();

        router.push(routeKeys.workspaceSettings);
    };

    if (!workspaceId) {
        return <div className="border-border rounded-xl border p-6">Завантаження workspace...</div>;
    }

    return (
        <section className="mx-auto max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">Оберіть тариф</h1>
                <p className="text-muted-foreground mt-2">
                    Поточний тариф workspace:{" "}
                    <span className="text-foreground font-semibold uppercase">{workspace?.planKey}</span>
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => {
                    const isCurrent = workspace?.planKey === plan.key;
                    const isPaidPlan = plan.key !== workspacePlanKeys.free;

                    return (
                        <article
                            key={plan.key}
                            className={cn(
                                "relative flex flex-col justify-between rounded-2xl border p-6",
                                isCurrent ? "border-primary bg-primary/5 shadow-sm" : "border-border",
                            )}
                        >
                            {isPaidPlan && !isCurrent && (
                                <div className="absolute top-4 right-4 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                                    Через підтримку
                                </div>
                            )}
                            <div>
                                <p className="text-muted-foreground text-sm font-medium tracking-widest">
                                    {plan.name}
                                </p>
                                <p className="mt-3 text-4xl font-semibold">{plan.price}</p>
                                <p className="text-muted-foreground text-sm">на місяць</p>
                                <ul className="my-7 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="border-border border-b pb-3 text-sm">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button
                                className="w-full"
                                text={
                                    isCurrent
                                        ? "Поточний тариф"
                                        : isPaidPlan
                                          ? "Зверніться до підтримки"
                                          : "Обрати тариф"
                                }
                                disabled={isCurrent || (isPaidPlan && !isCurrent)}
                                loading={isLoading}
                                onClick={() => selectPlan(plan.key)}
                            />
                        </article>
                    );
                })}
            </div>
            {error && <p className="text-destructive mt-4 text-sm">{error.message}</p>}
            <div className="border-border bg-muted/40 text-muted-foreground mt-6 rounded-xl border p-4 text-sm">
                <p className="text-foreground font-medium">Зміна тарифу</p>
                <p className="mt-1">
                    Тарифи <strong>PRO</strong> та <strong>BUSINESS</strong> підключаються в індивідуальному
                    порядку через адміністратора/підтримку для захисту від спаму. Якщо вам потрібен розширений
                    тариф, зверніться до нас.
                </p>
            </div>
        </section>
    );
}
