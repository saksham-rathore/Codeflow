"use client";

import ky from "ky";
import { toast } from "sonner";
import { useState } from "react";
import {
    CopyIcon,
    HistoryIcon,
    LoaderIcon,
    PlusIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";


import { Id } from "../../../../convex/_generated/dataModel";

export const ConversationSidebar = ({ projectId }: { projectId: Id<"projects"> }) => {

    return (
        <div>
            ConversationSidebar:- {projectId}
        </div>
    )
};