import { wallNodes } from '../stores/walls';
import { getRandomArbitrary } from '../../../modules/numberGenerator';

let walls;

export function square_division(xsize, ysize) {

    let unsub = wallNodes.subscribe(v => walls = v);
    unsub();

    for(let y = 0; y < ysize; y+=6) {   
        for(let x = 1; x < xsize; x+=6) {
            const currentIndex = x + (xsize * y);
            generate(currentIndex, xsize, ysize);
        }
    }
    makeBorderWalls(xsize, ysize);
}

function makeBorderWalls(xsize, ysize) {
    const bottomBorder = (xsize * (ysize - 1));
    for (let x = 0; x < xsize; x++) {
        if(!walls.has(x + xsize)) wallNodes.add(x);
        else wallNodes.remove(x);
        if(!walls.has(x + bottomBorder - xsize)) wallNodes.add(x + bottomBorder);
        else wallNodes.remove(x + bottomBorder);
    }
    for (let y = 0; y < (ysize * xsize) - xsize; y+=xsize) {
        if(!walls.has(y + 1)) wallNodes.add(y);
        else wallNodes.remove(y);
        if(!walls.has(y + xsize - 2)) wallNodes.add(y + xsize - 1);
        else wallNodes.remove(y + xsize - 1);
    }
}

function generate(upperLeftCorner, xsize, ysize) {
    const upperRightCorner = upperLeftCorner + 4;
    const lowerLeftCorner = upperLeftCorner + (xsize * 4);
    const lowerRightCorner = upperRightCorner + (xsize * 4);

    const vertical = getRandomArbitrary(0,2);
    const random1 = getRandomArbitrary(1,4);
    const random2 = getRandomArbitrary(1,4);

    for(let x = 0; x < 5; x++) {
        if(!vertical && x == random1) continue;
        wallNodes.add(x + upperLeftCorner);
    }
    for(let x = 0; x < 5; x++) {
        if(!vertical && x == random2) continue;
        wallNodes.add(x + lowerLeftCorner);
    }
    
    for(let y = 1; y < 4; y++) {
        if(vertical && y == random1) continue;
        wallNodes.add(upperLeftCorner + (xsize * y));
    }
    for(let y = 1; y < 4; y++) {
        if(vertical && y == random2) continue;
        wallNodes.add(lowerRightCorner - (xsize * y));
    }

    
    const xmiddle = upperLeftCorner + 2;
    const ymiddle = upperLeftCorner + (xsize * 2);

    for(var x = 1; x < 4; x++) {
        const skip = getRandomArbitrary(0,5);
        if(skip == x) {
            vertical ? wallNodes.add(xmiddle - xsize): wallNodes.add(xmiddle + (xsize * 5));
            continue;
        }
        vertical ? wallNodes.add(xmiddle + (xsize * x)):wallNodes.add(ymiddle + x);
    }

    // wallNodes.add(xmiddle - xsize);
    // wallNodes.add(ymiddle - 1);
    // wallNodes.add(xmiddle + (xsize * 5));
    // wallNodes.add(ymiddle + 5);

}