import { writable } from "svelte/store";
import { generateArray } from "../modules/numberGenerator";

import { SortingAlgortihms } from "../modules/SortingAlgorithms";

function create() {
    const { subscribe, set, update } = writable({
        array: [],
        speed: 9,
        ascending: true,
        windows: [
            {
                algo: SortingAlgortihms[0],
                color: "cyan",
                // timer: () => {}
            },
        ],
    });

    return {
        subscribe,
        update,
        set,
        generateNewArray: (size) => {
            update((prev) => ({ ...prev, array: generateArray(size) }));
        },
    };
}

export const Sorting = create();
