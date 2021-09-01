import { writable } from 'svelte/store';
import { generateArray } from '../modules/numberGenerator';
import { generateRandomHexColor } from '../modules/randomColorGenerator';

function create() {
    const { subscribe, set, update } = writable({
        array: generateArray(130),
        windows: [
            {
                name: 'Linear Search',
                algo: () => {},
                color: generateRandomHexColor()
            },
            {
                name: 'Jump Search',
                algo: () => {},
                color: generateRandomHexColor()
            },
            {
                name: 'Binary Search',
                algo: () => {},
                color: generateRandomHexColor()
            }
        ]
    });

    return {
        subscribe,
        generateNewArray: size => update(prev => ({...prev, array: generateArray(size)}))
    }
}

export const Searching = create();