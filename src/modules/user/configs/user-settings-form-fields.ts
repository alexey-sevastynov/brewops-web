import { ResourceField } from "@/shared/types/resource-field";
import { resourceFieldTypes } from "@/shared/enums/resource-field-type";
import { User } from "@/modules/user/types/user";
import { userProps } from "@/modules/user/constants/user-props";
import { userLabels } from "@/modules/user/constants/user-labels";

export const userSettingsFormFields: ResourceField<User>[] = [
    {
        name: userProps.userName as keyof User,
        required: true,
        label: userLabels.userName,
        type: resourceFieldTypes.text,
    },
    {
        name: userProps.phoneNumber as keyof User,
        label: userLabels.phoneNumber,
        type: resourceFieldTypes.text,
        placeholder: userLabels.phoneNumber,
    },
];
