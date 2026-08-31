/* eslint-disable max-lines-per-function */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ShieldAlert, Settings } from "lucide-react";
import { apiClient } from "@/shared/lib/axios";
import { Button } from "@/shared/ui/button/Button";
import { buttonVariantKeys } from "@/shared/ui/button/button-variant-keys";
import { MRInput } from "@/shared/ui/input/Input";
import { ModalWindow } from "@/shared/ui/modal-window/ModalWindow";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { signOut } from "@/modules/auth/model/slice";
import { replaceRoute } from "@/shared/utils/navigation";
import { routeKeys } from "@/shared/constants/route-keys";

interface UserProfile {
    _id: string;
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}

interface UpdateProfilePayload {
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    password?: string;
}

export function ProfileSettings() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [confirmPhrase, setConfirmPhrase] = useState("");

    const fetchProfile = async () => {
        setLoading(true);

        try {
            const { data } = await apiClient.get<UserProfile>("/users/me");
            setProfile(data);
            setUserName(data.userName);
            setEmail(data.email);
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            setPhoneNumber(data.phoneNumber || "");
        } catch (err: unknown) {
            console.error("Failed to load user profile", err);
            setError("Не вдалося завантажити профіль.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const validatePasswords = (): boolean => {
        if (password && password !== confirmPassword) {
            setError("Паролі не співпадають.");
            return false;
        }

        return true;
    };

    const buildUpdatePayload = (): UpdateProfilePayload => {
        const payload: UpdateProfilePayload = {
            userName: userName.trim(),
            email: email.trim(),
            firstName: firstName.trim() || undefined,
            lastName: lastName.trim() || undefined,
            phoneNumber: phoneNumber.trim() || undefined,
        };

        if (password) {
            payload.password = password;
        }

        return payload;
    };

    const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
        const { data } = await apiClient.patch<UserProfile>("/users/me", payload);

        return data;
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccessMessage("");

        if (!validatePasswords()) {
            return;
        }

        setSaving(true);

        try {
            const payload = buildUpdatePayload();
            const updatedProfile = await updateProfile(payload);

            setProfile(updatedProfile);
            setPassword("");
            setConfirmPassword("");
            setSuccessMessage("Профіль успішно оновлено!");
        } catch (err: unknown) {
            console.error("Failed to update profile", err);
            setError("Не вдалося оновити профіль.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        if (confirmPhrase !== profile?.userName) {
            setError("Введено невірне ім'я користувача для підтвердження.");
            return;
        }

        setDeleting(true);
        setError("");

        try {
            await apiClient.delete("/users/me");
            setIsDeleteOpen(false);
            dispatch(signOut());
            replaceRoute(router, routeKeys.signIn);
        } catch (err: unknown) {
            console.error("Failed to delete account", err);
            setError("Не вдалося видалити акаунт.");
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
                Завантаження профілю...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <div className="border-border flex items-center gap-2 border-b pb-4">
                <Settings className="text-primary" size={24} />
                <h1 className="text-foreground text-xl font-bold">Налаштування акаунту</h1>
            </div>

            {error && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-500">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-500">
                    {successMessage}
                </div>
            )}

            <form
                onSubmit={handleUpdateProfile}
                className="border-border bg-card space-y-6 rounded-xl border p-6 shadow-sm"
            >
                <h2 className="text-md text-foreground border-border flex items-center gap-2 border-b pb-3 font-semibold">
                    <User size={18} className="text-primary" />
                    Особисті дані
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MRInput
                        label="Ім'я користувача (Username)"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <MRInput
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MRInput
                        label="Ім'я (First Name)"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <MRInput
                        label="Прізвище (Last Name)"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <MRInput
                        label="Номер телефону (UA)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+380XXXXXXXXX"
                    />
                </div>

                <h2 className="text-md text-foreground border-border flex items-center gap-2 border-b pt-4 pb-3 font-semibold">
                    <Lock size={18} className="text-primary" />
                    Зміна пароля (необов&apos;язково)
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MRInput
                        label="Новий пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                    <MRInput
                        label="Підтвердження пароля"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <div className="border-border flex justify-end border-t pt-4">
                    <Button
                        type="submit"
                        loading={saving}
                        text="Зберегти зміни"
                        variant={buttonVariantKeys.primary}
                        className="h-10 text-sm"
                    />
                </div>
            </form>

            {/* Danger Zone Card */}
            <div className="bg-card space-y-4 rounded-xl border border-red-500/20 p-6 shadow-sm">
                <h2 className="text-md flex items-center gap-2 border-b border-red-500/10 pb-3 font-semibold text-rose-500">
                    <ShieldAlert size={18} />
                    Небезпечна зона
                </h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                    Видалення облікового запису призведе до безповоротного видалення вашого профілю, всіх
                    створених вами кав&apos;ярень, звітів змін, фінансових звітів, аудитів складу та списків
                    співробітників. Цю дію <strong>неможливо скасувати</strong>.
                </p>

                <div className="flex justify-end">
                    <Button
                        type="button"
                        onClick={() => {
                            setConfirmPhrase("");
                            setIsDeleteOpen(true);
                        }}
                        text="Видалити акаунт"
                        variant={buttonVariantKeys.danger}
                        className="h-10 text-sm"
                    />
                </div>
            </div>

            <ModalWindow
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title="Видалення акаунту"
                size="md"
            >
                <form onSubmit={handleDeleteAccount} className="space-y-6">
                    <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-500">
                        <ShieldAlert size={20} className="mt-0.5 shrink-0" />
                        <div className="space-y-1 text-sm">
                            <p className="font-semibold">Ви збираєтеся видалити свій акаунт!</p>
                            <p className="text-xs leading-relaxed opacity-90">
                                Всі ваші дані, кав&apos;ярні, фінансові звіти, аудити, співробітники будуть
                                назавжди стерті без можливості відновлення.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-foreground block text-sm font-medium">
                            Для підтвердження введіть ваше ім&apos;я користувача (username):{" "}
                            <span className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs select-all">
                                {profile?.userName}
                            </span>
                        </label>

                        <MRInput
                            required
                            label=""
                            value={confirmPhrase}
                            onChange={(e) => setConfirmPhrase(e.target.value)}
                            placeholder={profile?.userName}
                        />
                    </div>

                    <div className="border-border flex justify-end gap-3 border-t pt-4">
                        <Button
                            type="button"
                            variant={buttonVariantKeys.secondary}
                            onClick={() => setIsDeleteOpen(false)}
                            text="Скасувати"
                            className="h-10 text-sm"
                        />
                        <Button
                            type="submit"
                            variant={buttonVariantKeys.danger}
                            loading={deleting}
                            disabled={confirmPhrase !== profile?.userName}
                            text="Я розумію, видалити акаунт"
                            className="h-10 text-sm"
                        />
                    </div>
                </form>
            </ModalWindow>
        </div>
    );
}
