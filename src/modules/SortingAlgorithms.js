import { mergeSort } from '../components/sorting/algorithms/merge';
import { bubbleSort } from '../components/sorting/algorithms/bubble';
import { quickSort } from '../components/sorting/algorithms/quick';
import { heapSort } from '../components/sorting/algorithms/heap';
import { shellSort } from '../components/sorting/algorithms/shell';

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
        algo: heapSort,
    },
    {
        name: "Shell Sort",
        algo: shellSort,
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
