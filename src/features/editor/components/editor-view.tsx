import { useFile, useUpdateFile } from "@/features/projects/hooks/use-files";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { TopNavigation } from "./top-navigation";
import { useCallback, useEffect, useRef } from "react";
import { FileBreadCrumbs } from "./file-breadcrumbs";

export const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {

    const { activeTabId } = useEditor(projectId);
    const activeFile = useFile(activeTabId);
    const updateFile = useUpdateFile();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);


    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center">
                <TopNavigation projectId={projectId} />
            </div>
            {activeTabId && <FileBreadCrumbs projectId={projectId} />}
            <div>

            </div>
        </div>
    )
}