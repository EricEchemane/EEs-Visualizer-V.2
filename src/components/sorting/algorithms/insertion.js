let animationFrames;
let descending;
let arr;

export function insertionSort(array, _descending) {
    descending = _descending;
    animationFrames = [];
    arr = [...array];

    sort();

    return animationFrames;
}

function sort() {
    for (let x = 1; x < arr.length; x++)
    {
        animationFrames.push({ type: 'invert-color', value1: x, value2: x-1});
        animationFrames.push({ type: 'revert-color', value1: x, value2: x-1});

        if (!descending) {
            if (arr[x - 1] > arr[x])
            {
                for (let y = x; y > 0; y--)
                {
                    animationFrames.push({ type: 'invert-color', value1: y, value2: y-1});
                    animationFrames.push({ type: 'revert-color', value1: y, value2: y-1});

                    if (arr[y] < arr[y - 1]) {

                        animationFrames.push({ type: 'invert-color', value1: y, value2: y-1});
                        animationFrames.push({ type: 'revert-color', value1: y, value2: y-1});

                        animationFrames.push({
                            type: 'swap-height',
                            node1: { index: y, height: arr[y - 1]},
                            node2: { index: y - 1, height: arr[y]},
                        })

                        const temp = arr[y];
                        arr[y] = arr[y - 1]
                        arr[y - 1] = temp
                    }
                }
            }            
        }
        else {
            if (arr[x - 1] < arr[x])
            {
                for (let y = x; y > 0; y--)
                {
                    animationFrames.push({ type: 'invert-color', value1: y, value2: y-1});
                    animationFrames.push({ type: 'revert-color', value1: y, value2: y-1});

                    if (arr[y] > arr[y - 1]) {

                        animationFrames.push({ type: 'invert-color', value1: y, value2: y-1});
                        animationFrames.push({ type: 'revert-color', value1: y, value2: y-1});

                        animationFrames.push({
                            type: 'swap-height',
                            node1: { index: y, height: arr[y - 1]},
                            node2: { index: y - 1, height: arr[y]},
                        })

                        const temp = arr[y];
                        arr[y] = arr[y - 1]
                        arr[y - 1] = temp
                    }
                }
            }
        }
    }
}