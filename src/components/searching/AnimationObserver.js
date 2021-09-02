import { writable } from 'svelte/store';

function create() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe, set, update,
        push: name => update(prev => [...prev, name])
    }
}

export const AnimationObserver = create();