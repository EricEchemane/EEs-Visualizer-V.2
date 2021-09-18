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
        name: "Breadth-first Search",
        algo: breadthFirstSearch,
        isWeighted: false
    },
    {
        name: "Depth-first Search",
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
    "Breadth-first Search": {
        name: "Breadth-first Search",
        algo: breadthFirstSearch,
        isWeighted: false
    },
    "Depth-first Search": {
        name: "Depth-first Search",
        algo: depthFirstSearch,
        isWeighted: false
    }
}