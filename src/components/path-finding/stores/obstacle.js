import { writable } from 'svelte/store';

export const obstacles = create();

function create() {
    const { subscribe, set, update } = writable(new Set());
    return {
        subscribe,
        add: index => update(prev => {
            const newSet = prev;
            newSet.add(index);
            return newSet;
        }),
        remove: index => update(prev => {
            const newSet = prev;
            newSet.delete(index);
            return newSet;
        }),
        clear: () => set(new Set())
    }
}