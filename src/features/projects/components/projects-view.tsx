"use client"

import React from 'react'
import { Poppins } from "next/font/google";
import { SparkleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";


import { ProjectList } from './projects-list';
import { ProjectsCommandDialog } from './projects-command-dialogue';
// import { ImportGithubDialog } from "./import-github-dialog";
// import { NewProjectDialog } from "./new-project-dialog";


const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export const ProjectsView = () => {
    return (
        <>
            <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
                <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">

                    <div className="flex justify-between gap-4 w-full items-center">

                        <div className="flex items-center gap-2 w-full group/logo">
                            <div>
                                <svg width="45" height="45" viewBox="0 0 469 407" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M234.375 0L468.75 406.25H0L234.375 0Z" fill="white" />
                                </svg>
                            </div>
                            <h1 className={cn(
                                "text-3xl md:text-4xl font-semibold tracking-tight",
                                font.className,
                            )}>
                                Codeflow
                            </h1>
                        </div>

                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"

                                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <SparkleIcon className="size-6" />
                                    <Kbd className="bg-accent border">
                                        ⌘ J
                                    </Kbd>
                                </div>
                                <div>
                                    <span className="text-sm">
                                        New
                                    </span>
                                </div>
                            </Button>
                            <Button
                                variant="outline"

                                className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <FaGithub className="size-6" />
                                    <Kbd className="bg-accent border">
                                        ⌘ I
                                    </Kbd>
                                </div>
                                <div>
                                    <span className="text-sm">
                                        Import
                                    </span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};