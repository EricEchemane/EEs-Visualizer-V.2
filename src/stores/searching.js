import { writable } from 'svelte/store';
import { generateArray } from '../modules/numberGenerator';

import { linearSearch } from '../components/searching/algortihms/linear';
import { binarySearch } from '../components/searching/algortihms/binary';

function create() {
    const { subscribe, set, update } = writable({
        array: generateArray(130),
        windows: [
            {
                name: 'Linear Search',
                algo: linearSearch,
                color: "#00FFFF"
            },
            // {
            //     name: 'Jump Search',
            //     algo: () => {},
            //     color: generateRandomHexColor()
            // },
            {
                name: 'Binary Search',
                algo: binarySearch,
                color: "#00FFFF"
            }
        ]
    });

    return {
        subscribe,
        generateNewArray: size => update(prev => ({...prev, array: generateArray(size)}))
    }
}

export const Searching = create();