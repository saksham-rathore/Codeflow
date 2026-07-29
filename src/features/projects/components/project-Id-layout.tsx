"use client";

import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Navbar } from "./navbar";


export const ProjectIdLayout = ({ children, projectId }: { children: React.ReactNode; projectId: Id<"projects"> }) => {
    return (
        <div className="w-full h-screen flex flex-col">
            <Navbar projectId={projectId} />
            {children}
        </div>
    );
};