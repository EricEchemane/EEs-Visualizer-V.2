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

                if (windows.length == 7) return prev;

                windows.push({
                    algo: SortingAlgortihms[windows.length],
                    color: "#00FFFF",
                });
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
        removeOne: (indexNumber) => {
            update((prev) => {
                const windows = prev.windows.filter(
                    (prev, index) => index != indexNumber
                );
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
    };
}

export const Sorting = create();
