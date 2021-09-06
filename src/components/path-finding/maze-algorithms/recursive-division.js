import { getRandomArbitrary } from '../../../modules/numberGenerator';
import displayWalls from './maze-animation';

const vertical = '|';
const horizontal = '__';
let gridWidth;
let walls;

export function recursive_division(xsize, ysize) {
    gridWidth = xsize;
    walls = [];
    /* 
    1. Get the boundary indeces {
        colStart, colEnd, height
    }
    2. Check wall orientation
    3. Generate randomEvenNumber for walls
        if vertical bisect from the randomINdex vertically
        else bisect horixontally
    4. Get the bounds of two sides
    */

   /* I need to adjust some of these parameters to adjust from the border walls */
   divide(1 + xsize, 1 + xsize + (xsize - 3), ysize - 2);
   displayWalls(walls);
}

function divide(colstart, colend, height) {
    const width = colend - colstart + 1;

    if(width < 3 || height < 3) return;

    const orientation = checkOrientation(width, height);

    if(orientation == vertical) {
        /* Walls should be on even indeces */
        let randomIndexToBisect = randomEvenNumber(width);
        let bisectionStartIndex = colstart + randomIndexToBisect;

        draw_V_walls(bisectionStartIndex, height);

        /* get the bounds of two left and right side */
        let leftColStart = colstart;
        let leftColEnd = colstart + randomIndexToBisect;
        let rightColStart = leftColEnd;
        let rightColEnd = leftColEnd + (width - 1 - randomIndexToBisect);
        
        /* recurse to left and right side */
        divide(leftColStart, leftColEnd, height);
        divide(rightColStart, rightColEnd, height);
    }
    else {
        /* Walls should be on even indeces */
        let randomIndexToBisect = randomEvenNumber(height);
        let bisectionStartIndex = colstart + (gridWidth * randomIndexToBisect);
        
        draw_H_walls(bisectionStartIndex, width);

        /* get the bounds of top and bottom side */
        let upperColStart = colstart;
        let upperColEnd = colend;

        let lowerColStart = bisectionStartIndex;
        let lowerColEnd = bisectionStartIndex + width - 1;

        let upperHeight = randomIndexToBisect;
        let lowerHeight = height - upperHeight;
        
        /* recurse to upper and lower side */
        divide(upperColStart, upperColEnd, upperHeight);
        divide(lowerColStart, lowerColEnd, lowerHeight);
    }
}

function randomEvenNumber(max) {
    if(max % 2 == 0) max--;
    let random = getRandomArbitrary(2, max);
    while(random % 2 != 0) random = getRandomArbitrary(2, max);
    return random;
}
function randomOddNumber(max) {
    if(max % 2 != 0) max--;
    let random = getRandomArbitrary(1, max);
    while(random % 2 == 0) random = getRandomArbitrary(1, max);
    return random;
}
function checkOrientation(width, height) {
    /* IF the same width and height, decide randomly */
    if(width == height) return getRandomArbitrary(0,2) == 1 ? vertical:horizontal;
    else return width > height ? vertical:horizontal;
}
function draw_V_walls(startIndex, bisectLength) {
    let doorIndex = randomOddNumber(bisectLength);
    for(let y = 0; y < bisectLength; y++) {
        let index = startIndex + (y * gridWidth);
        doorIndex == y 
            ? walls.push({type: 'remove', index: index}) 
            : walls.push({type: 'add', index: index});
    }
}
function draw_H_walls(startIndex, bisectLength) {
    let doorIndex = randomOddNumber(bisectLength);
    for(let x = 0; x < bisectLength; x++) {
        let index = startIndex + x;
        doorIndex == x 
            ? walls.push({type: 'remove', index: index}) 
            : walls.push({type: 'add', index: index});
    }
}