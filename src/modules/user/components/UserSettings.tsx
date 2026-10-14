"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { replaceRoute } from "@/shared/utils/navigation";
import { routeLabels } from "@/shared/constants/route-labels";
import { routeKeys } from "@/shared/constants/route-keys";
import { ResourceTable } from "@/shared/ui/resource-table/ResourceTable";
import { signOut } from "@/modules/auth/model/slice";
import { userColumns } from "@/modules/user/configs/user-columns";
import { createUserActionsColumn } from "@/modules/user/configs/user-actions";
import { User } from "@/modules/user/types/user";
import {
    deleteUserAccount,
    getUserProfile,
    updateUserProfile,
    UpdateUserProfilePayload,
} from "@/modules/user/model/user-thunks";
import { userSettingsFormFields } from "@/modules/user/configs/user-settings-form-fields";

export function UserSettings() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const profile = useAppSelector((state) => state.user.profile);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    if (!profile) return null;

    return (
        <ResourceTable<User>
            title="Дані профілю"
            data={[profile]}
            columns={userColumns}
            formFields={userSettingsFormFields}
            defaultValues={profile}
            onUpdate={async (values: User) => {
                const payload: UpdateUserProfilePayload = {
                    userName: values.userName.trim(),
                    phoneNumber: values.phoneNumber?.trim() || undefined,
                };

                await dispatch(updateUserProfile(payload)).unwrap();
            }}
            editTitle="Редагування профілю"
            onDelete={async () => {
                await dispatch(deleteUserAccount()).unwrap();

                dispatch(signOut());
                replaceRoute(router, routeKeys.signIn);
            }}
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
