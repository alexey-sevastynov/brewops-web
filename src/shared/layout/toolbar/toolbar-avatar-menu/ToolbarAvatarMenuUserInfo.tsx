import { LoadingIndicator } from "@/shared/ui/loading-indicator/LoadingIndicator";
import { Text } from "@/shared/ui/typography/text/Text";

interface ToolbarAvatarMenuUserInfoProps {
    isUserLoading: boolean;
    userName?: string;
    workspaceName?: string;
}

export function ToolbarAvatarMenuUserInfo({ isUserLoading, userName }: ToolbarAvatarMenuUserInfoProps) {
    return (
        <div className="border-border mb-1 border-b px-3 py-2">
            {isUserLoading ? (
                <LoadingIndicator text="" className="text-foreground [&>svg]:text-foreground" />
            ) : (
                <Text>{userName}</Text>
            )}
        </div>
    );
}
