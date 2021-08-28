/* This will observe each window animations.
When one has finished, we will push 1 item to the array.
When the array gets populated by N elements, 
where N is the number of windows, meaning that 
all animations are finished.
we can use this infor to enable the buttons. */

import { writable } from "svelte/store";

function create() {
    const { subscribe, set, update } = writable([]);
    return {
        subscribe,
        update,
        set,
        push: (newItem) => update(prev => [...prev, newItem])
    };
}

export const AnimationObserver = create();
