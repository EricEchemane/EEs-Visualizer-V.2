import { wallNodes } from '../stores/walls';
import { getRandomArbitrary } from '../../../modules/numberGenerator';

let walls;

export function square_division(xsize, ysize) {

    let unsub = wallNodes.subscribe(v => walls = v);
    unsub();

    for(let y = 1; y < ysize; y+=6) {   
        for(let x = 2; x < xsize; x+=6) {
            const currentIndex = x + (xsize * y);
            generate(currentIndex, xsize, ysize);
        }
    }
    for(let x = 1; x < xsize - 1; x++) {
        if(!walls.has(x + xsize + xsize)) wallNodes.remove(x + xsize);
        else if (!walls.has(x + xsize * 3)) wallNodes.add(x + xsize);
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

    const skip = getRandomArbitrary(0,2) == 1 ? 1 : 3;

    if(vertical) {
        const xmiddle = upperLeftCorner + 2;
        for(var x = 1; x < 4; x++) {
            if(skip == x) continue;
            wallNodes.add(xmiddle + (xsize * x));
        }
        /* wallNodes.add(xmiddle - xsize); */
        wallNodes.add(xmiddle + (xsize * 5));
    }
    else {
        const ymiddle = upperLeftCorner + (xsize * 2);
        for(let y = 1; y < 4; y++) {
            if(skip == y) continue;
            wallNodes.add(ymiddle + y);
        }
        /* wallNodes.add(ymiddle - 1); */
        wallNodes.add(ymiddle + 5);
    }
}