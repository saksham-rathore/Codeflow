import { useMutation, useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useProject = (projectId: Id<"projects">) => {
    return useQuery(api.projects.getById, { id: projectId });
};

export const useProjects = () => {
    return useQuery(api.projects.get);
}

export const useProjectsPartial = (limit: number) => {
    return useQuery(api.projects.getPartial, { limit });
};

export const usecreateProject = () => {
    return useMutation(api.projects.create).withOptimisticUpdate(
        (localStorage, args) => {
            const existingProject = localStorage.getQuery(api.projects.get);

            if (existingProject !== undefined) {
                const now = Date.now();
                const newProject = {
                    _id: crypto.randomUUID() as Id<"projects">,
                    _creationTime: now,
                    name: args.name,
                    ownerId: "anonymous",
                    updatedAt: now,
                };

                localStorage.setQuery(api.projects.get, {}, [
                    newProject,
                    ...existingProject,
                ]);
            }
        }
    )
};

export const useUpdateProjectSettings = () => {
    return useMutation(api.projects.updateSettings);
};

export const useRenameProject = () => {
    return useMutation(api.projects.rename).withOptimisticUpdate(
        (localStore, args) => {
            const existingProject = localStore.getQuery(
                api.projects.getById,
                { id: args.id }
            );

            if (existingProject !== undefined && existingProject !== null) {
                localStore.setQuery(
                    api.projects.getById,
                    { id: args.id },
                    {
                        ...existingProject,
                        name: args.name,
                        updatedAt: Date.now(),
                    }
                );
            }

            const existingProjects = localStore.getQuery(api.projects.get);

            if (existingProjects !== undefined) {
                localStore.setQuery(
                    api.projects.get,
                    {},
                    existingProjects.map((project) => {
                        return project._id === args.id
                            ? { ...project, name: args.name, updatedAt: Date.now() }
                            : project
                    })
                );
            }
        }
    )
};
