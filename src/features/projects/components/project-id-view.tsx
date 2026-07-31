"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Id } from "../../../../convex/_generated/dataModel";

const Tab = ({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30",
                isActive && "bg-background text-foreground"
            )}>
            <span className="text-sm">{label}</span>
        </div>
    );
};

export const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) => {

    const [activeView, setactiveView] = useState<"editor" | "preview">("editor");

    return (
        <div className="h-full flex flex-col">
            <nav className="h-8.75 flex items-center bg-sidebar border-b">

                <Tab
                    label="Code"
                    isActive={activeView === "editor"}
                    onClick={() => setactiveView("editor")}
                />

                <Tab
                    label="Preview"
                    isActive={activeView === "preview"}
                    onClick={() => setactiveView("preview")}
                />

                <div className="flex-1 flex justify-end h-full">
                    
                </div>

            </nav>
        </div>
    );
};