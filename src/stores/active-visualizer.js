import { writable } from "svelte/store";

function create() {
    const { subscribe, set, update } = writable("");
    return {
        subscribe,
        update,
        set,
    };
}

export const ActiveVisualizer = create();
