import { Node, getSorroundingIndeces } from '../helper-functions';

let searchAnimationFrames = [];
let pathAnimationFrames = [];
let arrayLength;
let start;
let destination;
let walls;
let obstacles;
let isBreadth;
let columnSize;
let visited;

export function depthFirstSearch (
    xsize,
    ysize,
    startIndex,
    destinationIndex,
    _wallNodes, /* Set of indeces of walls */
    _obstacles, /* Set of indeces of obstacles */
) {
    arrayLength = xsize * ysize;
    columnSize = xsize;
    start = startIndex;
    destination = destinationIndex;
    walls = _wallNodes;
    obstacles = _obstacles;
    isBreadth = false;

    searchAnimationFrames = [];
    pathAnimationFrames = [];

    let startNode = search();

    while(startNode != undefined) {
        pathAnimationFrames.push(startNode.indexNumber);
        startNode = startNode.parent;
    }

    pathAnimationFrames.reverse();
    return { searchAnimationFrames, pathAnimationFrames };
}

export function breadthFirstSearch(
    xsize,
    ysize,
    startIndex,
    destinationIndex,
    _wallNodes, /* Set of indeces of walls */
    _obstacles, /* Set of indeces of obstacles */
) {
    
    arrayLength = xsize * ysize;
    columnSize = xsize;
    start = startIndex;
    destination = destinationIndex;
    walls = _wallNodes;
    obstacles = _obstacles;
    isBreadth = true;

    searchAnimationFrames = [];
    pathAnimationFrames = [];

    let startNode = search();

    while(startNode != undefined) {
        pathAnimationFrames.push(startNode.indexNumber);
        startNode = startNode.parent;
    }

    pathAnimationFrames.reverse();
    return { searchAnimationFrames, pathAnimationFrames };
}

function search() { 

    if(start == destination) return null;

    visited = new Set();
    visited.add(start);

    let startNode = new Node(start);
    let que = [startNode];

    while(que.length > 0) {
        let currentNode = isBreadth ? que.shift() : que.pop();

        if(currentNode.indexNumber == destination) return currentNode;
        else if(currentNode) {
            const index = currentNode.indexNumber;
            const { up, down, left, right } = getSorroundingIndeces(index, columnSize);

            if(left >= 0 && isValidIndex(left)) {
                visited.add(left);
                const newNode = new Node(left);
                newNode.parent = currentNode;
                que.push(newNode);
                searchAnimationFrames.push(left);
            }
            if(up >= 0 && isValidIndex(up)) {
                visited.add(up);
                const newNode = new Node(up);
                newNode.parent = currentNode;
                que.push(newNode);
                searchAnimationFrames.push(up);
            }
            if(right < arrayLength && isValidIndex(right)) {
                visited.add(right);
                const newNode = new Node(right);
                newNode.parent = currentNode;
                que.push(newNode);
                searchAnimationFrames.push(right);
            }
            if(down < arrayLength && isValidIndex(down)) {
                visited.add(down);
                const newNode = new Node(down);
                newNode.parent = currentNode;
                que.push(newNode);
                searchAnimationFrames.push(down);
            }
        }
    }
}

function isValidIndex(index) {
    /* returns true if the given index is not visited and not an obstacle */
    return !visited.has(index) && !walls.has(index);
}