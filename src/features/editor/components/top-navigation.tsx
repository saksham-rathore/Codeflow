import { ScrollArea } from "@/components/ui/scroll-area";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { useFile } from "@/features/projects/hooks/use-files";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { FileIcon } from "@react-symbols/icons/utils";

export const TopNavigation = ({
    fileId,
    isFirst,
    projectId
}: { projectId: Id<"projects">; isFirst: boolean; fileId: Id<"files"> }) => {
    const file = useFile(fileId);
    const {
        activeTabId,
        previewTabId,
        setActiveTab,
        openFile,
        closeTab,
    } = useEditor(projectId);

    const isActive = activeTabId === fileId;
    const isPreview = previewTabId === fileId;
    const fileName = file?.name ?? "Loading...";

    return (
        <div onClick={() => setActiveTab(fileId)}
            onDoubleClick={() => openFile(fileId, { pinned: true })}
            className={cn(
                "flex items-center gap-2 h-8.75 pl-2 pr-1.5 cursor-pointer text-muted-foreground group border-y border-x border-transparent hover:bg-accent/30",
                isActive &&
                "bg-background text-foreground border-x-border border-b-background -mb-px drop-shadow",
                isFirst && "border-l-transparent!"
            )}
        >
            {file === undefined ? (
                <Spinner className="text-ring" />
            ) : (
                <FileIcon fileName={fileName} autoAssign className="size-4" />
            )}
            <span className={cn(
                "text-sm whitespace-nowrap",
                isPreview && "italic"
            )}>
                {fileName}
            </span>
            
        </div >
    )
}