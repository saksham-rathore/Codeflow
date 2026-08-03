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

    // if (isRenaming) {
    //     return (
    //         <RenameInput
    //             type="file"
    //             defaultValue={fileName}
    //             level={level}
    //             onSubmit={handleRename}
    //             onCancel={() => setIsRenaming{false}}
    //         />
    //     )
    // }
}