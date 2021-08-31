let animationFrames;
let descending;
let arr;

export function selectionSort(array, _descending) {
    descending = _descending;
    animationFrames = [];
    arr = [...array];

    sort();

    return animationFrames;
}

function sort() {
    let i, j, min_idx;

    for (i = 0; i < arr.length - 1; i++)
    {
        min_idx = i;

        for (j = i + 1; j < arr.length; j++) {
            
            animationFrames.push({ type: 'invert-color', value1: j, value2: min_idx});
            animationFrames.push({ type: 'revert-color', value1: j, value2: min_idx});

            if (descending) {
                if (arr[j] > arr[min_idx]) min_idx = j;
            }
            else {
                if (arr[j] < arr[min_idx]) min_idx = j;
            }
        }
        animationFrames.push({ type: 'invert-color', value1: i, value2: min_idx});
        animationFrames.push({ type: 'revert-color', value1: i, value2: min_idx});

        animationFrames.push({
            type: 'swap-height',
            node1: { index: min_idx, height: arr[i]},
            node2: { index: i, height: arr[min_idx]},
        })

        const temp = arr[min_idx]
        arr[min_idx] = arr[i]
        arr[i] = temp;
    }
}