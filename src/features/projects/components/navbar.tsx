"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CloudCheckIcon, Ghost, LoaderIcon } from "lucide-react";
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
    const project = useProject(projectId);
    const renameProject = useRenameProject();

    const [isRenaming, setIsRenaming] = useState(false);
    const [name, setname] = useState("");

    return (
        <nav className="flex justify-between items-center gap-x-2 p-4 bg-sidebar border-b">
            <div className="flex items-center gap-x-2">
                <Breadcrumb>
                    <BreadcrumbList className="gap-0!">
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="flex items-center gap-1.5"
                                asChild
                            >
                                <Button
                                    variant="ghost"
                                    className="w-fit! p-1.5! h-7!"
                                    asChild
                                >
                                    <Link href="/">
                                        <Image
                                            src="/logo.svg"
                                            alt="Logo"
                                            width={20}
                                            height={20}
                                        />
                                        <span
                                            className={cn(
                                                "text-2xl font-medium tracking-tight",
                                                font.className,
                                            )}
                                        >
                                            Codeflow
                                        </span>
                                    </Link>
                                </Button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="ml-0! mr-1" />
                        <BreadcrumbItem>
                            {isRenaming ? (
                                <input
                                    autoFocus
                                    type="text"
                                    onFocus={(e) => e.currentTarget.select()}
                                    className="text-xl bg-transparent text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"
                                />
                            ) : (
                                <BreadcrumbPage
                                    className="text-xl pl-4 justify-center cursor-pointer hover:text-primary font-medium max-w-40 truncate"
                                >
                                    {project?.name ?? "Loading..."}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </nav>
    )
};