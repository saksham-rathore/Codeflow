import Link from "next/link";
import { FaGithub } from "react-icons/fa";
// import { formatDistanceToNow } from "date-fns";
import { AlertCircleIcon, ArrowRightIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import { Doc } from "../../../../convex/_generated/dataModel";

import { useProjectsPartial } from "../hooks/use-projects";

const formatTimestamp = () => {

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">
                Last updated
            </span>
            <Button
                variant="outline"
                asChild
                className="h-auto items-start justify-start p-4 bg-background border rounded-none flex flex-col gap-2"
            >
                <Link href={} className="group">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">

                            <span className="font-medium truncate">

                            </span>
                        </div>
                        <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs text-muted-foreground">

                    </span>
                </Link>
            </Button>
        </div>
    )
};


return (
    <Link
        href={ }
        className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
    >
        <div className="flex items-center gap-2">

            <span className="truncate">{ }</span>
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">

        </span>
    </Link>
);


return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                    Recent projects
                </span>
                <button

                    className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
                >
                    <span>View all</span>
                    <Kbd className="bg-accent border">
                        ⌘K
                    </Kbd>
                </button>
            </div>
            <ul className="flex flex-col">

            </ul>
        </div>
    </div>
);