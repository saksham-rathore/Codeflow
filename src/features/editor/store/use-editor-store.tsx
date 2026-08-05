import { create } from "zustand"

import { Id } from "../../../../convex/_generated/dataModel"

interface TabState {
    openTabs: Id<"files">[];
    activeTabId: Id<"files"> | null;
    previewTabId: Id<"files"> | null;
}


const defaultTabState: TabState = {
    openTabs: [],
    activeTabId: null,
    previewTabId: null,
}

interface EditorStore {
    tabs: Map<Id<"projects">, TabState>;

    getTabState: (projectId: Id<"projects">) => TabState;

    openFile: (
        projectId: Id<"projects">,
        fileId: Id<"files">,
        options: { pinned: boolean }
    ) => void;

    closeTab: (ProjectId: Id<"projects">, fileId: Id<"files">) => void;
    closeAllTabs: (projectId: Id<"projects">) => void;
    setActiveTab: (projectId: Id<"projects">, fileId: Id<"files">) => void;
};

// export const useEditorStore = create<EditorStore>()((set, get) => ({

// }))