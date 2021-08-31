let animationFrames;
let descending;
let arr;

export function shellSort(array, _descending) {
    descending = _descending;
    animationFrames = [];
    arr = [...array];

    sort();

    return animationFrames;
}

function sort() {
    let gap = Math.floor(arr.length / 2);

    while ( gap >= 1) {
        for (let j = gap; j < arr.length; j++) {
            for (let i = j - gap; i >= 0; i -= gap) {

                animationFrames.push({ type: 'invert-color', value1: i+gap, value2: i});
                animationFrames.push({ type: 'revert-color', value1: i+gap, value2: i});

                if (!descending) {
                    if (arr[i + gap] > arr[i]) break;    
                }else
                    if (arr[i + gap] < arr[i]) break;    
                
                animationFrames.push({ type: 'invert-color', value1: i+gap, value2: i});
                animationFrames.push({ type: 'revert-color', value1: i+gap, value2: i});

                animationFrames.push({ 
                    type: 'swap-height',
                    node1: { index: i, height: arr[i + gap]},
                    node2: { index: i + gap, height: arr[i]},
                })

                const temp = arr[i + gap]
                arr[i + gap] = arr[i]
                arr[i] = temp;
            }
        }
        gap = Math.floor(gap / 2)
    }
}