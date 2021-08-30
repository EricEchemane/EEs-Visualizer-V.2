import { writable } from "svelte/store";

function create() {
    const { subscribe, set, update } = writable(new Map());
    return {
        subscribe,
        update,
        set,
    };
}

export const SpeedTracker = create();
