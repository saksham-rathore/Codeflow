import { Id } from "../../../../convex/_generated/dataModel";

const ProjectIdPage = async ({
    params,
}: {
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Project ID: {projectId}</h1>
        </div>
    );
};

export default ProjectIdPage;
