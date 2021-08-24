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

                /* the current index that is available */
                let x;

                for (let i = 0; i < SortingAlgortihms.length; i++) {
                    const used = windows.find((w) => {
                        console.log(w.algo.name);
                        return w.algo.name == SortingAlgortihms[i].name;
                    });
                    if (!used) {
                        x = i;
                        break;
                    }
                }

                windows.push({
                    algo: SortingAlgortihms[x],
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
