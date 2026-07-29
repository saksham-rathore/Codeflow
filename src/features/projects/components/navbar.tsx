"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CloudCheckIcon, LoaderIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { formatDistanceToNow } from "date-fns";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { useProject, useRenameProject } from "../hooks/use-projects";

import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const Navbar = ({
    projectId
}: {
    projectId: Id<"projects">
}) => {
};