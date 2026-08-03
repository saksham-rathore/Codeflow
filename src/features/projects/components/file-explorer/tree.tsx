import { useState } from "react";

import { ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";

import { cn } from "@/lib/utils";

import {
    useCreateFile,
    useCreateFolder,
    useFolderContents,
    useRenameFile,
    useDeleteFile,
} from "@/features/projects/hooks/use-files";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { TreeItemWrapper } from "./tree-item-wrapper";
import { Item } from "@/components/ui/item";

export const Tree = ({
    item,
    level = 0,
    projectId,
}: {
    item: Doc<"files">;
    level?: number;
    projectId: Id<"projects">;
}) => {
    const [IsOpen, setIsOpen] = useState(false);
    const [IsRenaming, setIsRenaming] = useState(false);
    const [Creating, setCreating] = useState<"file" | "folder" | null>(null);

    const renameFile = useRenameFile({
        projectId,
        parentId: item.parentId,
    });

    const deleteFile = useDeleteFile({
        projectId,
        parentId: item.parentId,
    });

    const createFile = useCreateFile();
    const createFolder = useCreateFolder();

    const { openFile, closeTab, activeTabId } = useEditor(projectId);


    const folderContents = useFolderContents({
        projectId,
        parentId: item.parentId,
        enabled: item.type === "folder" && IsOpen,
    });

    const handleRename = (newName: string) => {
        setIsRenaming(false);

        if (newName === item.name) {
            return;
        };

        renameFile({ id: item._id, newName })
    }

    const handleCreate = (name: string) => {
        setCreating(null);

        if (Creating === 'file') {
            createFile({
                projectId,
                name,
                content: "",
                parentId: item._id
            });
        } else {
            createFolder({
                projectId,
                name,
                parentId: item._id,
            });
        }
    };


    if (item.type === "file") {
        const fileName = item.name;
        const isActive = activeTabId === item._id
    }

    if (IsRenaming) {
        return (
            <RenameInput
                type="file"
                defaultValue={fileName}
                level={level}
                onSubmit={handleRename}
                onCancel={() => setIsRenaming(false)}
            />
        );
    }
    return (
        <TreeItemWrapper
            item={item}
            level={level}
            isActive={isActive}
            onClick={() => openFile(item._id, { pinned: false })}
            onDoubleClick={() => openFile(item._id, { pinned: true })}
            onRename={() => setIsRenaming(true)}
            onDelete={() => {
                closeTab(item._id);
                deleteFile({ id: item._id })
            }}
        >
            <FileIcon fileName={fileName} autoAssign className="size-4" />
            <span className="truncate text-sm">{fileName}</span>
        </TreeItemWrapper>
    )
}

const folderName = Item.name;

const folderRender = (
    <>
        <div className="flex items-center gap-0.5">
            <ChevronRightIcon
                className={cn(
                    "size-4 shrink-0 text-muted-foreground",
                    Isopen && "rotate-90"
                )}
            />
            <FolderIcon folderName={folderName} className="size-4" />
        </div>
        <span className="truncate text-sm">{folderName}</span>
    </>
)