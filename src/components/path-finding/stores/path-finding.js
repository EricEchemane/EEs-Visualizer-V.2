import { writable } from 'svelte/store';

function create() {
    const { subscribe, set, update } = writable({
        xsize: 0,
        ysize: 0,
        speed: 9
    });
    return {
        subscribe,
        set, update,
        setGridSize: (xsize, ysize) => update(
            prev => ({ ...prev, xsize: xsize, ysize: ysize}))
    }
}

export const PathFinding = create();