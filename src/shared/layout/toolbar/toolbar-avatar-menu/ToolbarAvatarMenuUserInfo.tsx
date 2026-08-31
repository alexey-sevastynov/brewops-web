import { LoadingIndicator } from "@/shared/ui/loading-indicator/LoadingIndicator";
import { textSizes } from "@/shared/ui/typography/text-size";
import { Text } from "@/shared/ui/typography/text/Text";

interface ToolbarAvatarMenuUserInfoProps {
    isUserLoading: boolean;
    userName?: string;
    userRole?: string;
    workspaceName?: string;
}

export function ToolbarAvatarMenuUserInfo({
    isUserLoading,
    userName,
    userRole,
    workspaceName,
}: ToolbarAvatarMenuUserInfoProps) {
    return (
        <div className="border-border mb-1 border-b px-3 py-2">
            {isUserLoading ? (
                <LoadingIndicator text="" className="text-foreground [&>svg]:text-foreground" />
            ) : (
                <Text>{userName}</Text>
            )}
            <Text className="text-muted-foreground" textSize={textSizes.sm}>
                {userRole}
            </Text>
            {workspaceName && (
                <Text className="text-muted-foreground mt-2 border-t pt-2" textSize={textSizes.sm}>
                    Workspace: {workspaceName}
                </Text>
            )}
        </div>
    );
}
