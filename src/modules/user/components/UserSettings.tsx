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
import { userColumns } from "@/modules/user/configs/user-columns";
import { createUserActionsColumn } from "@/modules/user/configs/user-actions";
import { User } from "@/modules/user/types/user";
import { routeLabels } from "@/shared/constants/route-labels";

interface UpdateProfilePayload {
    userName: string;
    phoneNumber?: string;
}

export function UserSettings() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        setLoading(true);

        try {
            const { data } = await apiClient.get<User>("/users/me");
            setProfile(data);
        } catch (err: unknown) {
            console.error("Failed to load user profile", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
        const { data } = await apiClient.patch<User>("/users/me", payload);

        return data;
    };

    const handleUpdateProfile = async (values: User) => {
        try {
            const payload: UpdateProfilePayload = {
                userName: values.userName.trim(),
                phoneNumber: values.phoneNumber?.trim() || undefined,
            };
            const updatedProfile = await updateProfile(payload);

            setProfile(updatedProfile);
        } catch (err: unknown) {
            console.error("Failed to update profile", err);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await apiClient.delete("/users/me");
            dispatch(signOut());
            replaceRoute(router, routeKeys.signIn);
        } catch (err: unknown) {
            console.error("Failed to delete account", err);
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
        <ResourceTable<User>
            title="Дані профілю"
            data={profile ? [profile] : []}
            columns={userColumns}
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
            createActionsColumn={(onDelete, onEdit) => createUserActionsColumn(onDelete, onEdit)}
            showPagination={false}
            showExport={false}
            showFilters={false}
            showColumnVisibility={false}
            exportConfig={{ fileName: "user-profile", sheetName: routeLabels.profileSettings }}
        />
    );
}
