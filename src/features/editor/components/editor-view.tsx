import { useFile, useUpdateFile } from "@/features/projects/hooks/use-files";
import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { TopNavigation } from "./top-navigation";
import { useCallback, useEffect, useRef } from "react";
import { FileBreadcrumbs } from "./file-breadcrumbs";
import Image from "next/image";
import { CodeEditor } from "./code-editor";
import { AlertTriangleIcon } from "lucide-react";

const DEBOUNCE_MS = 1500;

export const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {

    const { activeTabId } = useEditor(projectId);
    const activeFile = useFile(activeTabId);
    const updateFile = useUpdateFile();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isActiveFileBinary = activeFile && activeFile.StorageId;
    const isActiveFileText = activeFile && !activeFile.StorageId;

    // Cleanup pending debounced updates on unmount or file change
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [activeTabId]);

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
                {isActiveFileText && (
                    <CodeEditor
                        key={activeFile._id}
                        fileName={activeFile.name}
                        initialValue={activeFile.content}
                        onChange={(content: string) => {
                            if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current)
                            }

                            timeoutRef.current = setTimeout(() => {
                                updateFile({ id: activeFile._id, content });
                            }, DEBOUNCE_MS)
                        }}
                    />
                )}
                {isActiveFileBinary && (
                    <div className="size-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2.5 max-w-md text-center">
                            <AlertTriangleIcon className="size-10 text-yellow-500" />
                            <p className="text-sm">
                                The file is not displayed in the text editor because it is either binary or uses an unsupported text encoding.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}