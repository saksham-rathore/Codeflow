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

export const useEditorStore = create<EditorStore>()((set, get) => ({
    tabs: new Map(),

    getTabState: (projectId) => {
        return get().tabs.get(projectId) ?? defaultTabState;
    },

    openFile: (projectId, fileId, { pinned }) => {
        const tabs = new Map(get().tabs);
        const state = tabs.get(projectId) ?? defaultTabState;
        const { openTabs, previewTabId } = state;
        const isOpen = openTabs.includes(fileId);
    }

        // case 1: opening as preview - replace as existing preview 
    if(!isOpen && !pinned) {
    const newTabs = previewTabId
        ? openTabs.map((id) => (id === previewTabId) ? fileId : id)
        : [...openTabs, fileId]

        tabs.set(projectId, {
            openTabs: newTabs,
            activeTabId: fileId,
            previewTabId: fileId,
        });
    set({ tabs });
    return;
}

// case 2: Opening as pinned - add new tab
if (!isOpen && pinned) {
    tabs.set(projectId, {
        ...state,
        opensTabs: [...openTabs, fileId],
        activeTabId: fileId,
    });
    set({ tabs });
    return;
}

// Case 3: File already open - just activate (and pin if double-clicked)
const shouldPin = pinned && previewTabId === fileId;
tabs.set(projectId, {
    ...state,
    activeTabId: fileId,
    previewTabId: shouldPin ? null : previewTabId,
});
set({ tabs });

closeTab: (projectId, fileId) => {
    const tabs = new Map(get().tabs);
    const state = tabs.get(projectId) ?? defaultTabState;
    const { opensTabs, activeTabId, previewTabId } = state;
    const tabIndex = opensTabs.indexof(fileId);

    if (tabIndex === -1) return;

    const newTabs = openTabs.filter((id) => id !== fileId);

    let newActiveTabId = activeTabId;
    if (activeTabId === fileId) {
        if (newTabs.length === 0) {
            newActiveTabId = null;
        } else if (tabIndex >= newTabs.length) {
            newActiveTabId = newTabs[tabIndex];
        } else {
            newActiveTabId = newTabs[tabIndex];
        }
    }
}

}));