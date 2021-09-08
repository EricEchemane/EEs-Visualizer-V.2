import { getRandomArbitrary } from '../../../modules/numberGenerator';
import { wallNodes } from '../stores/walls';
import { getSorroundingIndeces } from '../helper-functions';
import displayWalls, { displayObstacles } from './maze-animation';

let walls; /* a Set cotaining the indeces of walls */
let gridWidth;
let wallsArray;

export function randomDFS(xsize, ysize, forWalls = true) {
    /* If you dont do 'walls = value' and not 'walls = new Set(value)' 
    the 'walls' will become reactive to changes and it will break the animations. */
    const unsub = wallNodes.subscribe(value => walls = new Set(value));
    unsub();
    gridWidth = xsize;
    wallsArray = [];

    /* pick a starting index */
    let startingIndex = getRandomArbitrary(2 + xsize * 2, xsize * (ysize - 2));
    let stack = [startingIndex]; /* initialize ths stack with the starting index */

    while(stack.length > 0) {
        /* Just copy the top of the stack
        Do not pop() because we will use the stack to backtrack nodes */
        let curIndex = topOfThe(stack); 

        if(!walls.has(curIndex)) makeWall(curIndex); 

        /* Get the sorrounding indeces that are not walls.
        Also added validation to bounds of the array */
        let indeces = getSorroundingIndeces(curIndex, gridWidth, true)
            .filter(index => (!walls.has(index) && index >= 0 && index < xsize * ysize));    

        /* If no found indeces, this is a deadend
        adn we need to backtrack one node */
        if(indeces.length <= 0) {
            stack.pop();
            continue;
        }

        /* pick a random index for random sorrounding 'indeces' */
        let randomIndex = getRandomArbitrary(0, indeces.length);

        /* Will the condition is true, it will try to look for 
        a valid index that is not a deadend. */
        while( deadEnd(indeces[randomIndex], curIndex) ) 
        {
            /* Eliminate the sorrounding indeces that are deadend */
            indeces = indeces.filter(each => each != indeces[randomIndex]);

            if(indeces.length <= 0) {
                randomIndex = -1;
                break;
            }
            else randomIndex = getRandomArbitrary(0, indeces.length);
        }
        /* If we found a node that is not a deadend, we will continue the traversal.
        else: backtrack one node by popping one from the top of the stack */
        randomIndex != -1 ? stack.push(indeces[randomIndex]) : stack.pop();
    }

    forWalls ? displayWalls(wallsArray) : displayObstacles(wallsArray);
}

function deadEnd(_index, except) {
    /* First, get the sorrounding nodes of the 
    predecessor which is the except variable */
    let exceptAdjacents = getSorroundingIndeces(except, gridWidth, true);
    exceptAdjacents = new Set(exceptAdjacents);

    const { up, down, left, right } = getSorroundingIndeces(_index, gridWidth);
    /* up + 1 = top right diagonal, up - 1 = top left diagonal...so on... */
    const surroundingIndeces = [ up, down, left, right, up + 1, up - 1, down - 1, down + 1 ];
    /* Look for each adjacent nodes, including its diagonals, that are already walls */
    /* If one of those are walls, this _index is a deadend */
    for(let i = 0; i < surroundingIndeces.length; i++) {
        const index = surroundingIndeces[i];
        if( index != except 
            /* This next line below is very important: 
            it excludes the diagonals that are already walls on the check */
            && !exceptAdjacents.has(index) 

            && walls.has(index)) return true;
    }
    return false;
}

function topOfThe(stack) {
    return stack[stack.length - 1];
}

function makeWall(index) {
    walls.add(index);
    wallsArray.push({ type: 'add', index: index});
}