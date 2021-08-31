import { mergeSort } from '../components/sorting/algorithms/merge';
import { bubbleSort } from '../components/sorting/algorithms/bubble';
import { quickSort } from '../components/sorting/algorithms/quick';
import { heapSort } from '../components/sorting/algorithms/heap';
import { shellSort } from '../components/sorting/algorithms/shell';
import { insertionSort } from '../components/sorting/algorithms/insertion';
import { selectionSort } from '../components/sorting/algorithms/selection';

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
        algo: insertionSort,
    },
    {
        name: "Selection Sort",
        algo: selectionSort,
    },
    {
        name: "Bubble Sort",
        algo: bubbleSort,
    },
];
