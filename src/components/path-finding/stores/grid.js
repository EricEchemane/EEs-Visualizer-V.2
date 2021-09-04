import { writable } from 'svelte/store';
export const gridStore = createGridStore();

function createGridStore() {
    const { subscribe, set, update } = writable({ startIndex: 37, destinationIndex: 754 });
    return {
        subscribe,
        updateStartIndex: index => update(prev => ({...prev, startIndex: index})),
        updateDestination: index => update(prev => ({...prev, destinationIndex: index})),
        set: (start, destination) => set({ startIndex: start, destinationIndex: destination})
    }
}

/* SETS containing the indeces of nodes */
export const visitedNodes = writable(new Set()); 
export const wallNodes = writable(new Set()); 
export const pathNodes = writable(new Set()); 
export const weightedNodes = writable(new Set()); 
