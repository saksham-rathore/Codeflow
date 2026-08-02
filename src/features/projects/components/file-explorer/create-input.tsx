import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { getItemPadding } from "./constants";

export const CreateInput = ({
    type,
    level,
    onSubmit,
    onCancel
}: {
    type: "file" | "folder",
    level: number,
    onSubmit: (name: string) => void;
    onCancel: () => void;
}) => {
    const [Value, setValue] = useState("");

    const handleSubmit = () => {
        const trimmedValue = Value.trim();
        if (trimmedValue) {
            onSubmit(trimmedValue);
        } else {
            onCancel();
        }
    }
    return (
        <div className="w-full flex items-center gap-1 h-5.5 bg-accent/30"
            style={{ paddingLeft: getItemPadding(level, type === "file") }}
        >
            <div className="flex items-center gap-0.5">
                {type === "folder" && (
                    <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
                )}
                {type === "folder" && (
                    <FileIcon fileName={Value} autoAssign className="size-4" />
                )}
                {type === "file" && (
                    <FolderIcon className="size-4" folderName={Value} />
                )}
            </div>
            <input
                autoFocus
                type="text"
                value={Value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-ring"
                onBlur={handleSubmit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit();
                    }
                    if (e.key === "Escape") {
                        onCancel();
                    }
                }}
            />
        </div>
    );
};