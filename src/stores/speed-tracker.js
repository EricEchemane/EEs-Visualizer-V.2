import { writable } from "svelte/store";

function create() {
    const { subscribe, set, update } = writable({});
    return {
        subscribe,
        clear: () => set(new Map()),
        report: (key, value) => update(prev => ({...prev, [key]: value})),
        remove: key => update(prev => {
            const newObject = {};
            for(const _key in prev) if(_key != key) newObject[_key] = prev[_key];
            return newObject;
        })
    };
}

export const SpeedTracker = create();
