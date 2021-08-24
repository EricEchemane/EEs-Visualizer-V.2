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
                color: "#00FFFF",
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
        addWindow: () => {
            update((prev) => {
                const windows = [...prev.windows];
                windows.push({
                    algo: SortingAlgortihms[windows.length],
                    color: "cyan",
                });
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
    };
}

export const Sorting = create();
