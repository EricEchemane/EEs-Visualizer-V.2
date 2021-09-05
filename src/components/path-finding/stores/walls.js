import { writable } from 'svelte/store';
import { gridStore } from './grid';

export const wallNodes = create();

function create() {
    const { subscribe, set, update } = writable(new Set());
    return {
        subscribe,
        add: index => update(prev => {
            const newSet = prev;
            let s,d;
            const unsub = gridStore.subscribe(value => {
                s = value.startIndex; d = value.destinationIndex;
            });
            unsub();
            if(index == s || index == d) return prev;
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