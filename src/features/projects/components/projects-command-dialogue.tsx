import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { useProject, useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";

interface ProjectsCommandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (projects: Doc<"projects">) => {
    if (projects.importstatus === "completed") {
        return <FaGithub className="size-4 text-muted-foreground" />
    }

    if (projects.importstatus === "failed") {
        return <AlertCircleIcon className="size-4 text-muted-foreground" />;
    }

    if (projects.importstatus === "importing") {
        return (
            <Loader2Icon className="size-4 text-muted-foreground animate-spin" />
        );
    }

    return <GlobeIcon className="size-4 text-muted-foreground" />
}

export const ProjectsCommandDialog = (
    {
        open,
        onOpenChange,
    }: ProjectsCommandDialogProps
) => {
    const router = useRouter();
    const projects = useProjects();

    const handleSelect = (projectId: string) => {
        router.push(`/projects/${projectId}`);
        onOpenChange(false);
    };

    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Search Projects"
            description="Search and navigate to your projects"
        >
            <CommandInput placeholder="Search projects..." />
            <CommandList>
                <CommandEmpty>No projects found.</CommandEmpty>
                <CommandGroup heading="Projects">
                    {projects?.map((project) => (
                        <CommandItem
                            key={project._id}
                            value={`${project.name}-${project._id}`}
                            onSelect={() => handleSelect(project._id)}
                        >
                            {getProjectIcon(project)}
                            <span>{project.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};