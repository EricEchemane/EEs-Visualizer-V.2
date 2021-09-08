import { getSorroundingIndeces, WeightedNode } from '../helper-functions';

let searchAnimationFrames = [];
let pathAnimationFrames = [];
let arrayLength;
let start;
let destination;
let walls;
let obstacles;
let gridWidth;

let nodes;

export function dijkstra(
    width, 
    height,
    startIndex,
    destinationIndex,
    _wallNodes, /* Set of indeces of walls */
    _obstacles, /* Set of indeces of obstacles */
    ) {
    gridWidth = width;
    arrayLength = width * height;
    start = startIndex;
    destination = destinationIndex;
    walls = _wallNodes;
    obstacles = _obstacles;

    searchAnimationFrames = [];
    pathAnimationFrames = [];

    let pathStartingNode = search();
    
    while(pathStartingNode != undefined) {
        pathAnimationFrames.push(pathStartingNode.indexNumber);
        pathStartingNode = pathStartingNode.parent;
    }

    pathAnimationFrames.reverse();
    return { searchAnimationFrames, pathAnimationFrames };
}

function search() {

    initNodes();

    nodes[start].updateDistance(0);

    /* here I am using just an array as a que that I sort from time 
    to time to maintain its order by nearest distance. 
    This should be a priority que or a min heap. */
    const nodesInOrder = [nodes[start]];

    while(nodesInOrder.length > 0)
    {
        let curNode = nodesInOrder.shift();

        if(!curNode) continue;
        if(curNode.indexNumber == destination) return curNode;

        let unvisitedNeighbors = getUnvisitedNeighbors(curNode.indexNumber);

        unvisitedNeighbors.forEach(neighbor => {
            searchAnimationFrames.push(neighbor.indexNumber);
            const neighborDistance = neighbor.distance;
            const additionalDistance = neighbor.isObstacle ? 2 : 1;
            const tentativeDistance = curNode.distance + additionalDistance;
            if(tentativeDistance < neighborDistance) {
                neighbor.updateDistance(tentativeDistance);
                neighbor.parent = curNode;
            }
            if(neighbor.visited == false) {
                neighbor.visit();
                nodesInOrder.push(neighbor);
            }
        });
        
        sortNodesByDistance(nodesInOrder);

        curNode.visit();
    }
}

/* Initialize nodes as a map of all nodes. index as the key.
By default, distance is Infinity, visited = false and parent is undefined
as stated in the WeightedNode Class */
function initNodes() {
    nodes = {};
    for(let x = 0; x < arrayLength; x++) {
        /* make sure to exclude the walls */
        if(walls.has(x)) continue;
        nodes[x] = new WeightedNode(x);
        if(obstacles.has(x)) nodes[x].isObstacle = true;
    }
}

function getUnvisitedNeighbors(nodeIndex) {
    return getSorroundingIndeces(nodeIndex, gridWidth, true)
        /* make sure it is inside the bound of the grid */
        .filter(each => (each >= 0 && each < arrayLength))
        /* get the nodes */
        .map(each => nodes[each])
        .filter(each => (each?.visited == false && !walls.has(each)));
}

function sortNodesByDistance(arrayOfNodes) {
    arrayOfNodes.sort((node1, node2) => node1.distance - node2.distance);
}