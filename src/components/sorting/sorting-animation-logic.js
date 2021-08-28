import { changeColor, changeHeight } from '../../modules/animation-functions';

/* the array containing information about each window color and algo */
let windowsArray; 

/* array of arrays: each sub array correspond to each window */
let animationFrames;

let speed;
let descending; /*:boolean sort order */

let iterators = {}; /* mapping for tracking and caching the current animation position */
let animationIntervals = {}; /* map: key: indexNumber, value: array of setIntervals */

export function recieveAnimationData(
    windowsAnimationFrames,
    sortingStoreObjectValue) 
{
    animationFrames = windowsAnimationFrames;
    windowsArray = sortingStoreObjectValue.windows;
    speed = sortingStoreObjectValue.speed;
    descending = sortingStoreObjectValue.ascending;

    iterators = {};
    animationIntervals = {};

    animate();
}

function animate() {
    for (let i = 0; i < animationFrames.length; i++) {
        /* this is the animation frame for each window */
        const Frames = animationFrames[i];

        iterators[i] = iterators[i] | 0;
        animationIntervals[i] = [];
        
        const interval = setInterval(() => {
            console.log(iterators[i]);
            iterators[i] += 1;
        }, 1000 - (speed * 105));

        animationIntervals[i].push(interval);

    }

    /* schedule the clearInterval for each window animation
    frames so it doesn't go infinite */
    for (let j = 0; j < animationFrames.length; j++) {
        const activePosition = iterators[j];
        const Frames = animationFrames[j];
        const remainingTime = Frames.length - activePosition - 1;
        setTimeout(() => 
            clearArrayOfIntervals(animationIntervals[j]), 
            (1000 - (speed * 105)) * remainingTime);
    }
}

function clearArrayOfIntervals(intervals) {
    intervals.forEach(interval => clearInterval(interval));
}