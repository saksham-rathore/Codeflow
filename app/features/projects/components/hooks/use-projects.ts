import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export const useProject = (projectId: Id<"projects">) => {
    return useQuery(api.project.getById, { id: projectId });
};

export const useProjects = () => {
    return useQuery(api.project.get, {});
};

export const useProjectsPartial = (limit: number) => {
    return useQuery(api.project.getPartial, {
        limit,
    })
}

export const useCreateProject = () => {
    return useMutation(api.project.create).withOptimisticUpdate((localStore, args) => {
        const existingProjects = localStore.getQuery(api.project.get);

        if (existingProjects !== undefined) {
            const now = Date.now();
            const newProject = {
                id: crypto.randomUUID() as Id<"projects">,
                _creationTime: now,
                name: args.name,
                ownerId: "anonymous",
                updatedAt: now,
            };
        }
    });
}

export const useRenameProject = () => {
    return useMutation(api.project.rename).withOptimisticUpdate(
        (localStorage, args) => {
            const existingProject = localStorage.getQuery(api.project.getById, { id: args.id });

            if (existingProject !== undefined && existingProject !== null) {
                localStorage.setQuery(
                    api.project.getById,
                    { id: args.id },
                    {
                        ...existingProject,
                        name: args.name,
                        updatedAt: Date.now(),
                    }
                );
            }
            const existingProjects = localStorage.getQuery(api.project.get);

            if (existingProjects !== undefined) {
                localStorage.setQuery(
                    api.project.get,
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

export const useUpdateProjectSettings = () => {
    return useMutation(api.project.updateSettings);
};