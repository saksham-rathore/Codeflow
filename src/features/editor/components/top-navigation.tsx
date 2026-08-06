import { ScrollArea } from "@/components/ui/scroll-area";
import { Id } from "../../../../convex/_generated/dataModel";

export const TopNavigation = ({ projectId }: { projectId: Id<"projects"> }) => {

    return (
        <ScrollArea className="flex-1">
            <div className="bg-slider flex items-center h-8.75 border-b">
                Top Navigation
            </div>
        </ScrollArea>
    )
}

