"use client";

import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";


export const ProjectIdLayout = ({ children, projectId }: { children: React.ReactNode; projectId: string; }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {children}
        </div>
    );
};