import { writable } from "svelte/store";
import { generateArray } from "../modules/numberGenerator";

import { SortingAlgortihms } from "../modules/SortingAlgorithms";

function algoIsUsed(algoName /* string */, windowsArray /* window[] */) {
    for (let i = 0; i < windowsArray.length; i++) {
        const window = windowsArray[i];
        if (window.algo.name == algoName) return true;
    }
    return false;
}

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

                let nextAlgo;
                const algo = [...SortingAlgortihms];

                for (let i = 0; i < algo.length; i++) {
                    const currentAlgo = algo[i];
                    /* check if currentAlgo is present in the windows
                    if present: continue
                    else current algo will be use then break */
                    if (!algoIsUsed(currentAlgo.name, windows)) {
                        nextAlgo = currentAlgo;
                        break;
                    }
                }

                windows.push({
                    algo: nextAlgo,
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
                if (prev.windows.length == 1) return prev;
                const windows = [];
                for (let i = 0; i < prev.windows.length; i++) {
                    if (i != indexNumber) windows.push(prev.windows[i]);
                }
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
        updateColor: (color, index) => {
            update((prev) => {
                const windows = [...prev.windows];
                for (let i = 0; i <= index; i++) {
                    if (i == index) {
                        windows[i].color = color;
                        break;
                    }
                }
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
        changeAlgo: (index, algoName) => {
            const algo = SortingAlgortihms.filter((a) => a.name == algoName);
            update((prev) => {
                const windows = [...prev.windows];
                windows[index].algo = algo;
                return {
                    ...prev,
                    windows: windows,
                };
            });
        },
    };
}

export const Sorting = create();
