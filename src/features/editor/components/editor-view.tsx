import { useFile, useUpdateFile } from "@/features/projects/hooks/use-files";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { TopNavigation } from "./top-navigation";
import { useCallback, useEffect, useRef } from "react";
import { FileBreadcrumbs } from "./file-breadcrumbs";
import Image from "next/image";
import { CodeEditor } from "./code-editor";

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
            {activeTabId && <FileBreadcrumbs projectId={projectId} />}
            <div className="flex-1 min-h-0 bg-background">
                {!activeFile && (
                    <div className="size-full flex items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Codeflow"
                            width={200}
                            height={200}
                            className="opacity-8"
                        />
                    </div>
                )}
                <CodeEditor />
            </div>
        </div>
    )
}