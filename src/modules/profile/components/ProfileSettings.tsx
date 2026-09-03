/* eslint-disable max-lines-per-function */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/shared/lib/axios";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { signOut } from "@/modules/auth/model/slice";
import { replaceRoute } from "@/shared/utils/navigation";
import { routeKeys } from "@/shared/constants/route-keys";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { profileColumns } from "@/modules/profile/configs/profile-columns";
import { createProfileActionsColumn } from "@/modules/profile/configs/profile-actions";
import { UserProfile } from "@/modules/profile/types/user-profile";

interface UpdateProfilePayload {
    userName: string;
    phoneNumber?: string;
}

export function ProfileSettings() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchProfile = async () => {
        setLoading(true);

        try {
            const { data } = await apiClient.get<UserProfile>("/users/me");
            setProfile(data);
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

    const updateProfile = async (payload: UpdateProfilePayload): Promise<UserProfile> => {
        const { data } = await apiClient.patch<UserProfile>("/users/me", payload);

        return data;
    };

    const handleUpdateProfile = async (values: UserProfile) => {
        setError("");
        setSuccessMessage("");

        try {
            const payload: UpdateProfilePayload = {
                userName: values.userName.trim(),
                phoneNumber: values.phoneNumber?.trim() || undefined,
            };
            const updatedProfile = await updateProfile(payload);

            setProfile(updatedProfile);
            setSuccessMessage("Профіль успішно оновлено!");
        } catch (err: unknown) {
            console.error("Failed to update profile", err);
            setError("Не вдалося оновити профіль.");
        }
    };

    const handleDeleteAccount = async () => {
        setError("");

        try {
            await apiClient.delete("/users/me");
            dispatch(signOut());
            replaceRoute(router, routeKeys.signIn);
        } catch (err: unknown) {
            console.error("Failed to delete account", err);
            setError("Не вдалося видалити акаунт.");
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
        <ResourceTable<UserProfile>
            title="Дані профілю"
            data={profile ? [profile] : []}
            columns={profileColumns}
            formFields={[
                {
                    name: "userName",
                    label: "Ім'я користувача (Username)",
                    type: resourceFieldTypes.text,
                    required: true,
                },
                {
                    name: "phoneNumber",
                    label: "Номер телефону (UA)",
                    type: resourceFieldTypes.text,
                    placeholder: "+380XXXXXXXXX",
                },
            ]}
            defaultValues={profile ?? undefined}
            onUpdate={handleUpdateProfile}
            editTitle="Редагування профілю"
            onDelete={handleDeleteAccount}
            deleteConfirmDescription="Ви дійсно хочете видалити свій акаунт? Цю дію неможливо скасувати."
            createActionsColumn={(onDelete, onEdit) => createProfileActionsColumn(onDelete, onEdit)}
            showPagination={false}
            showExport={false}
            showFilters={false}
            showColumnVisibility={false}
            exportConfig={{ fileName: "user-profile", sheetName: "Профіль" }}
        />
    );
}
