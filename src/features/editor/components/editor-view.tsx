import { Id } from "../../../../convex/_generated/dataModel";
import { useEditor } from "../hooks/use-editor";
import { TopNavigation } from "./top-navigation";

export const EditorView = ({ projectId }: { projectId: Id<"projects"> }) => {

    const { openTabs } = useEditor(projectId);
    const {closeAllTabs} = useEditor(projectId);
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center">
                <TopNavigation projectId={projectId} />
            </div>
        </div>
    )
}


