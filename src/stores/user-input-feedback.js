import { writable } from "svelte/store";

function create() {
    const { subscribe, set, update } = writable({
        show: false,
        content: "",
    });
    return {
        subscribe,
        update,
        set: (show, content) => {
            set({ show: show, content: content });
        },
        hide: () => {
            set({ show: false, content: "" });
        },
    };
}

export const UserInputFeedback = create();
