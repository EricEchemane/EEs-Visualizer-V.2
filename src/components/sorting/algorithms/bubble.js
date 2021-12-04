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
        for (let j = 0; j < size - 1 - i; j++) {

            animationFrames.push({ type: 'invert-color-of2', value1: j + 1, value2: j });
            animationFrames.push({ type: 'revert-color-of2', value1: j + 1, value2: j });

            if (!descending) {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    animationFrames.push({
                        type: 'swap-height',
                        node1: { index: j, height: arr[j + 1] },
                        node2: { index: j + 1, height: temp }
                    });
                }
            }
            else {
                if (arr[j] < arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    animationFrames.push({
                        type: 'swap-height',
                        node1: { index: j, height: arr[j + 1] },
                        node2: { index: j + 1, height: temp }
                    });
                }
            }
        }
    }
}