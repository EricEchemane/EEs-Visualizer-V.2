let searchInterval;
let pathInterval;
let searchFrames;
let pathFrames;
let callback;

let search_currentIndex = 0;
let path_currentIndex = 0;

import { wallNodes } from './stores/walls';
import { visitedNodes } from './stores/visited';
import { pathNodes } from './stores/path';
import { PathFinding } from './stores/path-finding';

export function animate(_searchFrames, _pathFrames, _callback, search_startIndex = 0, path_startIndex = 0) {

    searchFrames = _searchFrames;
    pathFrames = _pathFrames;

    callback = _callback; /* call when animations are finsihed */

    search_currentIndex = search_startIndex;
    path_currentIndex = path_startIndex;

    pause();

    let speed;
    PathFinding.subscribe(v => speed = 105 - (v.speed * 10));

    searchInterval = setInterval(() => {
        const index = searchFrames[search_currentIndex];
        visitedNodes.add(index);
        search_currentIndex++;
        if(search_currentIndex >= searchFrames.length) {
            clearInterval(searchInterval);
            visitedNodes.clear();
            animatePath(pathFrames, path_currentIndex);
        }
    }, speed);
}

function animatePath(pathFrames, startIndex = 0) {
    path_currentIndex = startIndex;
    pathInterval = setInterval(() => {
        const index = pathFrames[path_currentIndex];
        pathNodes.add(index);
        path_currentIndex++;
        if(path_currentIndex >= pathFrames.length) callback();
    }, 40);
}

export function pause() {
    clearInterval(searchInterval);
    clearInterval(pathInterval);
}

export function resume() {
    animate(searchFrames, pathFrames, callback ,search_currentIndex, path_currentIndex);
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