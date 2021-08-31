import { writable } from "svelte/store";
import { generateArray } from "../modules/numberGenerator";

import { SortingAlgortihms as algos } from "../modules/SortingAlgorithms";
import { algoIsUsed } from "../modules/algoIsUsed-identifier";
import { generateRandomHexColor } from "../modules/randomColorGenerator";

function create() {
    const { subscribe, set, update } = writable({
        array: [],
        speed: 9,
        ascending: true,
        windows: [
            {
                algo: algos[0],
                color: "#00FFFF",
                resultSpeed: { total: 0, raw: "00:00:00"}
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
                /* limit the activeWindows base on how many algorithms */
                const activeWindows = [...prev.windows];

                if (activeWindows.length == algos.length) return prev;

                let nextAlgo; /* will be assigned to new window */

                /* Responsible in assigning algorithm to new window */
                for (let i = 0; i < algos.length; i++) {
                    const currentAlgo = algos[i];
                    /* if the currentAlgo is not used, use it */
                    if (!algoIsUsed(currentAlgo.name, activeWindows)) {
                        nextAlgo = currentAlgo;
                        break;
                    }
                }

                activeWindows.push({
                    algo: nextAlgo,
                    color: generateRandomHexColor(),
                    resultSpeed: { total: 0, raw: "00:00:00" }
                });

                return {
                    ...prev,
                    windows: activeWindows,
                };
            });
        },
        removeOne: (window) => {
            update((prev) => {
                const windows = prev.windows.filter((w) => w != window);
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
    };
}

export const Sorting = create();
