import { Id } from "../../../../convex/_generated/dataModel";
import { ProjectIdLayout } from "@/features/projects/components/project-Id-layout";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ projectId: string }>;
}) => {
    const { projectId } = await params;

    return (
        <ProjectIdLayout projectId={projectId as Id<"projects">}>
            {children}
        </ProjectIdLayout>
    );
};

export default Layout;
