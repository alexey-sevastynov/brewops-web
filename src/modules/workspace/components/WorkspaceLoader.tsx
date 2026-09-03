"use client";

import { Coffee } from "lucide-react";

interface WorkspaceLoaderProps {
    progress: number;
    status: string;
}

// eslint-disable-next-line max-lines-per-function
export function WorkspaceLoader({ progress, status }: WorkspaceLoaderProps) {
    const normalizedProgress = Math.max(0, Math.min(100, progress));

    return (
        <div className="bg-background fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
            <div
                aria-hidden="true"
                className="bg-primary/10 pointer-events-none absolute h-96 w-96 rounded-full blur-3xl"
            />

            <div className="relative flex flex-col items-center">
                <div className="relative mb-10 h-32 w-32">
                    <svg
                        viewBox="0 0 100 60"
                        className="text-muted-foreground absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 opacity-70 motion-reduce:hidden"
                        aria-hidden="true"
                    >
                        <path
                            d="M35 55 C 25 40, 45 35, 35 20 C 27 8, 40 4, 38 -2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="steam steam-1"
                        />
                        <path
                            d="M62 55 C 52 42, 70 34, 60 22 C 53 12, 64 6, 62 0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="steam steam-2"
                        />
                    </svg>

                    <svg viewBox="0 0 120 120" className="relative h-32 w-32" aria-hidden="true">
                        <defs>
                            <clipPath id="workspace-cup-inner">
                                <path d="M28 40 H82 L77 92 C76 100 68 106 55 106 C42 106 34 100 33 92 Z" />
                            </clipPath>
                        </defs>
                        <ellipse cx="55" cy="112" rx="40" ry="5" className="fill-muted" />
                        <path
                            d="M84 52 C 104 52 104 82 84 82"
                            fill="none"
                            className="stroke-border"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        <path
                            d="M28 40 H82 L77 92 C76 100 68 106 55 106 C42 106 34 100 33 92 Z"
                            fill="none"
                            className="stroke-foreground"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="20"
                            y={106 - Math.max(6, (normalizedProgress / 100) * 66)}
                            width="70"
                            height="66"
                            className="fill-[var(--chart-1)]"
                            clipPath="url(#workspace-cup-inner)"
                            style={{ transition: "y 0.35s ease-out" }}
                        />
                        <rect x="24" y="34" width="62" height="9" rx="4.5" className="fill-border" />
                    </svg>
                </div>

                <h1 className="text-foreground text-2xl font-semibold tracking-tight">
                    Готуємо робочий простір
                </h1>
                <p className="text-muted-foreground mt-3 h-5 text-sm transition-opacity duration-300">
                    {status}
                </p>

                <div className="mt-8 flex w-56 items-center gap-3">
                    <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                        <div
                            className="h-full rounded-full bg-[var(--chart-1)]"
                            style={{
                                width: `${normalizedProgress}%`,
                                transition: "width 0.35s ease-out",
                            }}
                        />
                    </div>
                    <span className="text-muted-foreground w-9 text-right text-xs tabular-nums">
                        {normalizedProgress}%
                    </span>
                </div>

                <div className="text-muted-foreground mt-10 flex items-center gap-2">
                    <Coffee className="h-4 w-4" aria-hidden="true" />
                    <span className="text-xs">не закривайте вкладку</span>
                </div>
            </div>

            <style>{`
                @keyframes steamRise {
                    0% { transform: translateY(6px); opacity: 0; }
                    30% { opacity: 0.7; }
                    100% { transform: translateY(-18px); opacity: 0; }
                }
                .steam { animation: steamRise 2.6s ease-in-out infinite; }
                .steam-2 { animation-delay: 0.9s; }
                @media (prefers-reduced-motion: reduce) {
                    .steam { animation: none; }
                }
            `}</style>
        </div>
    );
}
