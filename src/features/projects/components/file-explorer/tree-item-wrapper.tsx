import { cn } from "@/lib/utils";
import {
    ContextMenu,
    ContextMenuItem,
    ContextMenuContent,
    ContextMenuTrigger,
    ContextMenuShortcut,
    ContextMenuSeparator,
} from "@/components/ui/context-menu";

import { getItemPadding } from "./constants";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Children } from "react";

export const TreeItemWrapper = ({
    item,
    children,
    onActive,
    onClick,
    onCreateFile,
    onDelete,
    onDoubleClick,
    onRename,
    level,
}: {
    item: Doc<"files">;
    children: React.ReactNode;
    onClick?: () => void;
    onDelete?: () => void;
    onRename?: () => void;
    onCreateFile?: () => void;
    onDoubleClick?: () => void;
    onActive?: boolean;
    level: number;
}) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>





            </ContextMenuTrigger>
            <ContextMenuContent

                className="w-64"
            >

                <>
                    <ContextMenuItem

                        className="text-sm"
                    >

                    </ContextMenuItem>
                    <ContextMenuItem

                        className="text-sm"
                    >

                    </ContextMenuItem>
                    <ContextMenuSeparator />
                </>

                <ContextMenuItem

                    className="text-sm"
                >

                    <ContextMenuShortcut>

                    </ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem

                    className="text-sm"
                >

                    <ContextMenuShortcut>

                    </ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};