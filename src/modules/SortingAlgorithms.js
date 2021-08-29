import { mergeSort } from '../components/sorting/algorithms/merge';
import { bubbleSort } from '../components/sorting/algorithms/bubble';
import { quickSort } from '../components/sorting/algorithms/quick';

export const SortingAlgortihms = [
    {
        name: "Merge Sort",
        algo: mergeSort,
    },
    {
        name: "Quick Sort",
        algo: quickSort,
    },
    {
        name: "Heap Sort",
        algo: mergeSort,
    },
    {
        name: "Shell Sort",
        algo: mergeSort,
    },
    {
        name: "Insertion Sort",
        algo: mergeSort,
    },
    {
        name: "Selection Sort",
        algo: mergeSort,
    },
    {
        name: "Bubble Sort",
        algo: bubbleSort,
    },
];
