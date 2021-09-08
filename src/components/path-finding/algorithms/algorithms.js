import { breadthFirstSearch, depthFirstSearch } from './x-first-search';
import { dijkstra } from './dijkstra';

export const algorithms = [
    // {
    //     name: "A* Algorithm",
    //     algo: () => {}
    // },
    {
        name: "Dijkstra's Algorithm",
        algo: dijkstra,
        isWeighted: true
    },
    // {
    //     name: "Greedy Algorithm",
    //     algo: () => {}
    // },
    {
        name: "Breadth Search First",
        algo: breadthFirstSearch,
        isWeighted: false
    },
    {
        name: "Depth Search First",
        algo: depthFirstSearch,
        isWeighted: false
    },
];