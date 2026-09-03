"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button/Button";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { NotificationMessage } from "@/shared/ui/notification-message/notification-message";
import { notificationMessageKeys } from "@/shared/ui/notification-message/notification-message-key";
import { ValidatedInput } from "@/shared/ui/validated-input/ValidatedInput";
import { PasswordInput } from "@/shared/ui/password-input/PasswordInput";
import { replaceRoute } from "@/shared/utils/navigation";
import { routeKeys } from "@/shared/constants/route-keys";
import { SignInFormValues } from "@/modules/auth/types/sign-in-form-values";
import { login } from "@/modules/auth/components/auth-form/auth-form-sign-in/authFormSignIn.funcs";
import { Link } from "@/shared/ui/link/Link";
import { isSignInMode } from "@/modules/auth/components/auth-form/AuthForm.funcs";
import { AuthModeKey } from "@/modules/auth/enums/auth-mode-key";

export function AuthFormSignIn({ authMode }: { authMode: AuthModeKey }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const errorMessage = useAppSelector((state) => state.auth.error);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>();

    const onSubmit = async (data: SignInFormValues) => {
        const response = await login(dispatch, data);

        if (response.meta.requestStatus === "fulfilled") {
            replaceRoute(router, routeKeys.home);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <ValidatedInput
                name="email"
                control={control}
                errors={errors}
                label="Електронна пошта"
                type="email"
                rules={{ required: "Електронна пошта є обов'язковою" }}
                placeholder="johndoe@example.com"
            />

            <PasswordInput name="password" control={control} errors={errors} />

            {errorMessage?.message && (
                <NotificationMessage message={errorMessage.message} type={notificationMessageKeys.error} />
            )}

            {isSignInMode(authMode) && (
                <div className="mt-2 text-right">
                    <Link href={routeKeys.forgotPassword}>Забули пароль?</Link>
                </div>
            )}

            <Button
                text="Увійти"
                type="submit"
                className="flex w-full items-center justify-center space-x-2"
                loading={isLoading}
            />
        </form>
    );
}
