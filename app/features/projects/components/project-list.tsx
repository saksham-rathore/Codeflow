import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "./hooks/use-projects";

interface ProjectListProps {
    onViewAll: () => void;
}

export const ProjectList = ({ onViewAll }: ProjectListProps) => {
    const projects = useProjectsPartial(5)

    if (projects === undefined) {
        return <Spinner className="size-4 text-ring"/>
    }
    return (
        <div className="flex flex-col gap-4">
            
        </div>
    )
}