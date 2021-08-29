import { changeColor, changeHeight } from '../../modules/animation-functions';
import { AnimationObserver } from '../../stores/animations-observer';
import { Sorting } from '../../stores/Sorting';
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
    sortingStoreObjectValue) 
{
    animationFrames = windowsAnimationFrames;
    windowsArray = sortingStoreObjectValue.windows;
    speed = sortingStoreObjectValue.speed;

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

        const className = `bar-sorting-${windowsArray[i].algo.name}`;
        const color = windowsArray[i].color;
        const barNodes = document.getElementsByClassName(className);
        
        const interval = setInterval(() => {
            const type = Frames[iterators[i]]?.type;
            const v1 = Frames[iterators[i]]?.value1;
            const v2 = Frames[iterators[i]]?.value2;
            const node1 = barNodes[v1];
            const node2 = barNodes[v2];

            if(type == 'swap-height') {
                const node1 = Frames[iterators[i]]?.node1;
                const node2 = Frames[iterators[i]]?.node2;
                if(barNodes[node1.index]) changeHeight(node1.height, barNodes[node1.index]);
                if(barNodes[node2.index]) changeHeight(node2.height, barNodes[node2.index]);
            }
            else if(type == 'change-height' && node1) changeHeight(v2, node1);
            else {
                const invert = type == 'invert-color';
                if(node1) changeColor(color, node1, invert);
                if(node2) changeColor(color, node2, invert);
            }

            iterators[i] += 1;

            /* prevent from doing infinite.
            If the iterator is at the end of the array, stop it the animation */
            if(iterators[i] == Frames.length) {
                clearArrayOfIntervals(animationIntervals[i]);
                iterators[i] = 0;

                /* here it doesn't matter what type of data to push.
                We just need to populate the array */
                AnimationObserver.push(windowsArray[i].algo.name);
            };

        }, 1000 - (speed * 110));

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
