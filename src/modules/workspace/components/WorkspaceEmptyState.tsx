"use client";

import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { clearAuthCookies } from "@/shared/utils/cookie/auth-cookies";
import { routeKeys } from "@/shared/constants/route-keys";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { signOut } from "@/modules/auth/model/slice";

export function WorkspaceEmptyState() {
    const dispatch = useAppDispatch();

    const handleSignOut = () => {
        dispatch(signOut());
        clearAuthCookies();
        window.location.href = routeKeys.signIn;
    };

    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="border-border rounded-2xl border p-8 text-center max-w-md">
                <h1 className="text-2xl font-semibold">Workspace не знайдено</h1>

                <p className="text-muted-foreground mt-2 mb-6">
                    Спочатку створіть або виберіть workspace, щоб продовжити роботу.
                </p>

                <div className="flex justify-center">
                    <Button
                        variant={buttonVariantKeys.secondary}
                        iconName={iconNames.logOut}
                        text="Увійти в інший акаунт"
                        onClick={handleSignOut}
                    />
                </div>
            </div>
        </div>
    );
}
