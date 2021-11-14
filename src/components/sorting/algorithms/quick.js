let animationFrames;
let descending;
let arr;

export function quickSort(array, _descending) {
    descending = _descending;
    animationFrames = [];
    arr = [...array];

    sort(0, arr.length - 1);

    return animationFrames;
}

function partition_descending(left, right, PIVOT) {
    while (left <= right) {
        /* here we will push the animation comparision
        example: animation.comparision.push([left, right])
        because we are comparing left and right */
        while (arr[left] > PIVOT) {
            animationFrames.push({ type: 'invert-color', value1: left, value2: PIVOT });
            animationFrames.push({ type: 'revert-color', value1: left, value2: PIVOT });
            left++;
        }
        while (arr[right] < PIVOT) {
            animationFrames.push({ type: 'invert-color', value1: right, value2: PIVOT });
            animationFrames.push({ type: 'revert-color', value1: right, value2: PIVOT });
            right--;
        }
        if (left <= right) {
            animationFrames.push({ type: 'invert-color', value1: left, value2: right });
            animationFrames.push({ type: 'revert-color', value1: left, value2: right });

            animationFrames.push({
                type: 'swap-height',
                node1: { index: left, height: arr[right] },
                node2: { index: right, height: arr[left] }
            });

            // here I'm swapping left and right
            let temporary = arr[left];
            arr[left] = arr[right];
            arr[right] = temporary;

            left++;
            right--;
        }
    }
    return left;
}

function partition_ascending(left, right, PIVOT) {
    while (left <= right) {
        // here we will push the animation comparision
        // example: animationFrames.comparision.push([left, right])
        // because we are comparing left and right
        while (arr[left] < PIVOT) {
            animationFrames.push({ type: 'invert-color', value1: left, value2: PIVOT });
            animationFrames.push({ type: 'revert-color', value1: left, value2: PIVOT });
            left++;
        }

        while (arr[right] > PIVOT) {
            animationFrames.push({ type: 'invert-color', value1: right, value2: PIVOT });
            animationFrames.push({ type: 'revert-color', value1: right, value2: PIVOT });
            right--;
        }

        if (left <= right) {
            animationFrames.push({ type: 'invert-color', value1: left, value2: right });
            animationFrames.push({ type: 'revert-color', value1: left, value2: right });

            animationFrames.push({
                type: 'swap-height',
                node1: { index: left, height: arr[right] },
                node2: { index: right, height: arr[left] }
            });

            // here I'm swapping left and aright
            let temporary = arr[left];
            arr[left] = arr[right];
            arr[right] = temporary;

            left++;
            right--;
        }
    }
    return left;
}

function sort(left, right) {
    if (left >= right)
        return;
    /* Here I choose the middle element as the PIVOT index.
    make sure to always floor the mid to avoid infinite loop */
    let midIndex = Math.floor((left + right) / 2);
    let PIVOT = arr[midIndex];

    /* here, partition_descending or partition_ascending 
    should return the index of the pivot 
    or the element that is already in correct position */
    let DIVIDING_POINT = descending
        ? partition_descending(left, right, PIVOT)
        : partition_ascending(left, right, PIVOT);

    sort(left, DIVIDING_POINT - 1);
    sort(DIVIDING_POINT, right);
}
