let searchTimeouts;
let pathTimeouts;

import { wallNodes } from './stores/walls';
import { visitedNodes } from './stores/visited';
import { pathNodes } from './stores/path';
import { PathFinding } from './stores/path-finding';

export function animate(searchFrames, pathFrames) {

    searchTimeouts = [];
    pathTimeouts = [];
    let speed;
    PathFinding.subscribe(v => speed = 115 - (v.speed * 10));

    searchFrames.forEach((index, i) => {

        let timeout = setTimeout(() => {
            visitedNodes.add(index);
            if(i + 1 == searchFrames.length) {
                animatePath(pathFrames);
                visitedNodes.clear();
            }
        }, speed * i);

        searchTimeouts.push(timeout);
    });
}

function animatePath(pathFrames) {
    pathFrames.forEach((index, i) => {
        let timeout = setTimeout(() => {
            pathNodes.add(index);
        }, 30 * i);

        pathTimeouts.push(timeout);
    })
}


export function makeBorderWalls(xsize, ysize) {
    const bottomBorder = (xsize * (ysize - 1));
    for (let x = 0; x < xsize; x++) {
        wallNodes.add(x);
        wallNodes.add(x + bottomBorder);
    }
    for (let y = 0; y < (ysize * xsize) - xsize; y+=xsize) {
        wallNodes.add(y);
        wallNodes.add(y + xsize - 1);
    }
}