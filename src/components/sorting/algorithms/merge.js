let animationFrames;
let descending;
let arr;

export function mergeSort(array, _descending) {
    descending = _descending;
    animationFrames = [];
    arr = [...array];

    divide(0, arr.length - 1);

    return animationFrames;
}

function divide(leftIdx, rightIdx) {
    if (leftIdx >= rightIdx) return;
    const mid = Math.floor((rightIdx + leftIdx) / 2);
    divide(leftIdx, mid);
    divide(mid + 1, rightIdx);
    merge(leftIdx, mid, rightIdx);
}

function merge(leftIdx, midIdx, rightIdx) {
    const leftSize = (midIdx - leftIdx) + 1;
    const rightSize = rightIdx - midIdx;
    const leftsub = arr.slice(leftIdx, midIdx + 1);
    const rightsub = arr.slice(midIdx + 1);
    let i = 0; /* iterator for left sub-array */
    let j = 0; /* iterator for right sub-array */
    let k = leftIdx; /* iterator for the original array */

    while (i < leftSize && j < rightSize) {
        /* Push a frame which will invert the color of the indeces value1 and value2 */
        animationFrames.push({
            type: 'invert-color',
            value1: k,
            value2: leftIdx + leftSize + j,
        });
        animationFrames.push({
            type: 'revert-color',
            value1: k,
            value2: leftIdx + leftSize + j,
        });

        if (descending) {
            if (leftsub[i] > rightsub[j]) {
                animationFrames.push({
                    type: 'change-height',
                    value1: k,
                    value2: leftsub[i]
                });
                arr[k] = leftsub[i];
                i++; k++;
            }
            else {
                animationFrames.push({
                    type: 'change-height',
                    value1: k,
                    value2: rightsub[j]
                });
                arr[k] = rightsub[j];
                j++; k++;
            }
        }
        else {
            if (leftsub[i] < rightsub[j]) {
                animationFrames.push({
                    type: 'change-height',
                    value1: k,
                    value2: leftsub[i]
                });
                arr[k] = leftsub[i];
                i++; k++;
            }
            else {
                animationFrames.push({
                    type: 'change-height',
                    value1: k,
                    value2: rightsub[j]
                });
                arr[k] = rightsub[j];
                j++; k++;
            }
        }
    }

    while (i < leftSize) {

        animationFrames.push({
            type: 'invert-color',
            value1: leftIdx + i,
            value2: leftIdx + i,
        });
        animationFrames.push({
            type: 'revert-color',
            value1: leftIdx + i,
            value2: leftIdx + i,
        });
        animationFrames.push({
            type: 'change-height',
            value1: k,
            value2: leftsub[i],
        });

        arr[k] = leftsub[i];
        i++;
        k++;
    }

    while (j < rightSize) {
        animationFrames.push({
            type: 'invert-color',
            value1: rightIdx + j,
            value2: rightIdx + j,
        });
        animationFrames.push({
            type: 'revert-color',
            value1: rightIdx + j,
            value2: rightIdx + j,
        });
        animationFrames.push({
            type: 'change-height',
            value1: k,
            value2: rightsub[j],
        });

        arr[k] = rightsub[j];
        j++;
        k++;
    }
}