import { changeColor } from '../../modules/animation-functions';

import { writable } from 'svelte/store';
export const Found = writable({ 
    status: 'not-searched', 
    atIndex: null
});

/* the array containing information about each window color and algo */
let windowsArray; 

/* array of arrays: each sub array correspond to each window */
let animationFrames;

let speed;

/* mapping for caching the current animation position */
let iterators = {}; 

/* mapping: key: indexNumber, value: array of setIntervals */
let animationIntervals = {}; 


export function recieveAnimationData(
    windowsAnimationFrames,
    searchingStoreObjectValue,
    _speed) 
{
    animationFrames = windowsAnimationFrames;
    windowsArray = searchingStoreObjectValue.windows;
    speed = _speed;

    iterators = {};
    animationIntervals = {};

    animate();
}

export function animate() {

    for (let i = 0; i < animationFrames.length; i++) {
        /* this is the animation frame for each window */
        const Frames = animationFrames[i];

        /* this line is important to prevent finished
        animation from animating while others are not yet finished */
        if(iterators[i] == Frames.length) continue;

        iterators[i] = iterators[i] | 0;
        animationIntervals[i] = [];

        const className = `bar-search-${windowsArray[i].name}`;
        const barNodes = document.getElementsByClassName(className);
        
        const interval = setInterval(() => {
            const type = Frames[iterators[i]]?.type;
            const index = Frames[iterators[i]]?.index;
            const node = barNodes[index];

            if(type == 'invert-color' && node) changeColor("#8c6262", node, false);
            else if(type == 'found') {
                if(node) changeColor('lime', node, false);
                clearArrayOfIntervals(animationIntervals[i]);
                Found.set({ status: 'found', atIndex: i});
            }

            /* prevent from doing infinite.
            If the iterator is at the end of the array, stop it the animation */
            if(iterators[i] == Frames.length) {
                clearArrayOfIntervals(animationIntervals[i]);
                Found.set({ status: 'not-found', atIndex: null});
            };
            
            iterators[i] += 1;

        }, 1000 - (speed * 100));

        animationIntervals[i].push(interval);
    }
}

function clearArrayOfIntervals(intervals) {
    intervals.forEach(interval => clearInterval(interval));
}

export function pause() {
    for(const key in animationIntervals) {
        clearArrayOfIntervals(animationIntervals[key]);
    }
}

export function revertColors(windows) {
    windows.forEach(window => {
        const className = `bar-search-${window.name}`;
        const bars = document.getElementsByClassName(className);
        for (let index = 0; index < bars.length; index++) {
            const bar = bars[index];
            changeColor(window.color, bar, false);
        }
    })
}
