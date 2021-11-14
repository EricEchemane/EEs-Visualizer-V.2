let animationFrames;
let descending;
let arr;

export function bubbleSort(array, _descending) {

    descending = _descending;
    animationFrames = [];
    arr = [...array];

    sort();

    return animationFrames;
}


function sort() {
    let size = arr.length;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            if (descending) {
                if (arr[i] > arr[j]) {
                    animationFrames.push({ type: 'invert-color', value1: i, value2: j });
                    animationFrames.push({ type: 'revert-color', value1: i, value2: j });
                    const temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    animationFrames.push({
                        type: 'swap-height',
                        node1: { index: i, height: arr[j] },
                        node2: { index: j, height: temp }
                    });
                }
            }
            else {
                if (arr[i] < arr[j]) {
                    animationFrames.push({ type: 'invert-color', value1: i, value2: j });
                    animationFrames.push({ type: 'revert-color', value1: i, value2: j });
                    const temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    animationFrames.push({
                        type: 'swap-height',
                        node1: { index: i, height: arr[j] },
                        node2: { index: j, height: temp }
                    });
                }
            }
        }
    }
}