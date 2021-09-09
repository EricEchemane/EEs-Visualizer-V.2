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

export const algorithmsAsObject = {
    "Dijkstra's Algorithm": {
        name: "Dijkstra's Algorithm",
        algo: dijkstra,
        isWeighted: true,
    },
    "Breadth Search First": {
        name: "Breadth Search First",
        algo: breadthFirstSearch,
        isWeighted: false
    },
    "Depth Search First": {
        name: "Depth Search First",
        algo: depthFirstSearch,
        isWeighted: false
    }
}