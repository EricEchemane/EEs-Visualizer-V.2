import { changeColor, changeHeight } from '../../modules/animation-functions';

/* the array containing information about each window color and algo */
let windowsArray; 

/* array of arrays: each sub array correspond to each window */
let animationFrames;

let speed;

let iterators = {}; /* mapping for tracking and caching the current animation position */
let animationIntervals = {}; /* map: key: indexNumber, value: array of setIntervals */

export function recieveAnimationData(
    windowsAnimationFrames,
    sortingStoreObjectValue) 
{
    animationFrames = windowsAnimationFrames;
    windowsArray = sortingStoreObjectValue.windows;
    speed = sortingStoreObjectValue.speed;

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

        const className = `bar-sorting-${windowsArray[i].algo.name}`;
        const color = windowsArray[i].color;
        const barNodes = document.getElementsByClassName(className);
        
        const interval = setInterval(() => {
            const type = Frames[iterators[i]].type;
            const v1 = Frames[iterators[i]].value1;
            const v2 = Frames[iterators[i]].value2;

            if(type == 'change-height') {
                if(barNodes[v1]) changeHeight(v2, barNodes[v1]);
            }
            else {
                const invert = type == 'invert-color';
                if(barNodes[v1]) changeColor(color, barNodes[v1], invert);
                if(barNodes[v2]) changeColor(color, barNodes[v2], invert);
            }

            iterators[i] += 1;

            /* prevent from doing infinite.
            If the iterator is at the end of the array, stop it the animation */
            if(iterators[i] == Frames.length) clearArrayOfIntervals(animationIntervals[i]);

        }, 1000 - (speed * 110));

        animationIntervals[i].push(interval);
    }
}


function clearArrayOfIntervals(intervals) {
    intervals.forEach(interval => clearInterval(interval));
}