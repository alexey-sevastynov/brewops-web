import { cn } from "@/shared/lib/cn";
import { InvertedCorner } from "@/shared/layout/toolbar/inverted-corner/InvertedCorner";
import { ToolbarAvatarMenu } from "@/shared/layout/toolbar/toolbar-avatar-menu/ToolbarAvatarMenu";
import { WorkspaceContextSwitcher } from "@/modules/workspace/components/WorkspaceContextSwitcher";

interface ToolbarProps {
    className?: string;
    userName?: string;
    userRole?: string;
}

export function Toolbar({ className, userName, userRole }: ToolbarProps) {
    return (
        <header
            className={cn(
                "bg-sidebar relative flex h-14 flex-none items-center justify-between pr-4",
                className,
            )}
        >
            <InvertedCorner className="absolute top-full left-0" fillColor="fill-sidebar" />
            <WorkspaceContextSwitcher />
            <ToolbarAvatarMenu userName={userName} userRole={userRole} />
        </header>
    );
}
