import { changeColor, changeHeight } from '../../modules/animation-functions';

/* the array containing information about each window color and algo */
let windowsArray; 

/* array of arrays: each sub array correspond to each window */
let animationFrames;

let speed;
let descending; /*:boolean sort order */

let iterators = {}; /* mapping for tracking and caching the current animation position */
let animationIntervals = {}; /* map: key: indexNumber, value: array of setIntervals */

export function recieveData(
    windowsArray,
    windowsAnimationFrames,
    sortingStoreObjectValue) 
{

}