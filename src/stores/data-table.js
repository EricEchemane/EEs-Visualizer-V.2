import { writable } from 'svelte/store';

function create() {
    const { subscribe, update} = writable({ shown: false, data: [] });

    return {
        subscribe,
        hide: () => update(prev => ({...prev, shown: false})),
        show: () => update(prev => ({...prev, shown: true})),
        toggle: () => update(prev => ({...prev, shown: !prev.shown})),
        setData: data => update(prev => ({...prev, data: data})),
        clear: data => update(prev => ({ shown: false, data: [] })),
    }
}

export const DataTable = create();