import { writable } from 'svelte/store';

const clickEvents = {};
let currentKey;

function create() {
    const { subscribe, set, update } = writable(false);
    return {
        subscribe,
        hide: () => set(false),
        show: () => set(true),
        toggle: () => update(prev => !prev),
        registerClickEvent: (key, callback) => clickEvents[key] = callback,
        click: () => clickEvents[currentKey](),
        setKey: key => currentKey = key
    }
}

export const backdrop = create();