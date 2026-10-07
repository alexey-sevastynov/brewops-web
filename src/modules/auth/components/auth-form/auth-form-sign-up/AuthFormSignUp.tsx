"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button/Button";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { ValidatedInput } from "@/shared/ui/validated-input/ValidatedInput";
import { NotificationMessage } from "@/shared/ui/notification-message/notification-message";
import { notificationMessageKeys } from "@/shared/ui/notification-message/notification-message-key";
import { PasswordInput } from "@/shared/ui/password-input/PasswordInput";
import { SignUpFormValues } from "@/modules/auth/types/sign-up-form-values";
import { register } from "@/modules/auth/components/auth-form/auth-form-sign-up/authFormSignUp.funcs";

interface AuthFormSignUpProps {
    defaultEmail?: string;
    invitationToken?: string;
}

export function AuthFormSignUp({ defaultEmail, invitationToken }: AuthFormSignUpProps = {}) {
    const dispatch = useAppDispatch();
    const errorMessage = useAppSelector((state) => state.auth.error);
    const token = useAppSelector((state) => state.auth.token);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        defaultValues: { email: defaultEmail },
    });
    const password = watch("password");

    const onSubmit = (data: SignUpFormValues) => {
        register(dispatch, { ...data, invitationToken });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {invitationToken && (
                <NotificationMessage
                    message="Вас запрошено до робочого простору! Заповніть форму для завершення реєстрації."
                    type={notificationMessageKeys.info}
                    autoClose={0}
                />
            )}
            <ValidatedInput
                name="userName"
                control={control}
                errors={errors}
                label="Ім'я користувача"
                type="text"
                rules={{ required: "Ім'я користувача є обов'язковим" }}
                placeholder="Your name"
            />
            <ValidatedInput
                name="email"
                control={control}
                errors={errors}
                label="Електронна пошта"
                type="email"
                rules={{ required: "Електронна пошта є обов'язковою" }}
                placeholder="your@email.com"
            />
            <PasswordInput name="password" control={control} errors={errors} />
            <PasswordInput
                name="confirmPassword"
                control={control}
                errors={errors}
                label="Підтвердження пароля"
                rules={{
                    required: "Підтвердіть ваш пароль",
                    validate: (value: string) => value === password || "Паролі не співпадають",
                }}
            />
            {errorMessage?.message && (
                <NotificationMessage message={errorMessage.message} type={notificationMessageKeys.error} />
            )}
            {token && !errorMessage && (
                <NotificationMessage
                    message="Реєстрація успішна! Перевірте свою електронну пошту для підтвердження облікового запису."
                    type={notificationMessageKeys.info}
                    autoClose={0}
                />
            )}

            <Button text="Зареєструватися" type="submit" className="w-full" loading={isLoading} />
        </form>
    );
}
