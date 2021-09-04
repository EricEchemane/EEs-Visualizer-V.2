import { writable } from 'svelte/store';
export const gridStore = createGridStore();

function createGridStore() {
    const { subscribe, set, update } = writable({ startIndex: 38, destinationIndex: 753 });
    return {
        subscribe,
        updateStartIndex: index => update(prev => ({...prev, startIndex: index})),
        updateDestination: index => update(prev => ({...prev, destinationIndex: index})),
        set: (start, destination) => set({ startIndex: start, destinationIndex: destination})
    }
}

/* 
export const visitedNodes = writable(new Set()); 

export const pathNodes = writable(new Set()); 
*/