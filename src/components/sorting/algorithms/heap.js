let animationFrames;
let descending;
let arr;

export function heapSort(array, _descending) {
    descending = _descending;
    animationFrames = [];
    arr = [...array];

    sort();

    return animationFrames;
}

function sort() {
    let halfSize = arr.length / 2;
    halfSize = Math.floor(halfSize);
    
    for (let x = halfSize; x >= 0; x--) {
        heapify(arr.length, x);
    }
    for (let x = arr.length - 1; x > 0; x--)
    {
        animationFrames.push({ type: 'invert-color', value1: x, value2: 0 });
        animationFrames.push({ type: 'revert-color', value1: x, value2: 0 });

        animationFrames.push({
            type: 'swap-height',
            node1: { index: 0, height: arr[x] },
            node2: { index: x, height: arr[0] },
        });

        const temp = arr[0];
        arr[0] = arr[x];
        arr[x] = temp;

        heapify(x, 0);
    }
}

function heapify(size, root) {
    if (root >= size)
        return;

    let left = (2 * root) + 1;
    let right = (2 * root) + 2;

    if (left < size) {
        // comparision
        animationFrames.push({ type: 'invert-color', value1: left, value2: root });
        animationFrames.push({ type: 'revert-color', value1: left, value2: root });

        if (!descending) {
            if (arr[left] > arr[root]) {    

                animationFrames.push({ type: 'invert-color', value1: left, value2: root });
                animationFrames.push({ type: 'revert-color', value1: left, value2: root });

                animationFrames.push({
                    type: 'swap-height',
                    node1: { index: left, height: arr[root] },
                    node2: { index: root, height: arr[left] },
                });

                const temp = arr[left];
                arr[left] = arr[root];
                arr[root] = temp;
            }    
        }
        else {
            if (arr[left] < arr[root]) {

                animationFrames.push({ type: 'invert-color', value1: left, value2: root });
                animationFrames.push({ type: 'revert-color', value1: left, value2: root });

                animationFrames.push({
                    type: 'swap-height',
                    node1: { index: left, height: arr[root] },
                    node2: { index: root, height: arr[left] },
                });
               
                const temp = arr[left];
                arr[left] = arr[root];
                arr[root] = temp;
            }
        }
            
    }
    if (right < size) {
        // comparision
        animationFrames.push({ type: 'invert-color', value1: right, value2: root });
        animationFrames.push({ type: 'revert-color', value1: right, value2: root });

        if (!descending) {
          
            if (arr[right] > arr[root]) {

                animationFrames.push({ type: 'invert-color', value1: right, value2: root });
                animationFrames.push({ type: 'revert-color', value1: right, value2: root });

                animationFrames.push({
                    type: 'swap-height',
                    node1: { index: right, height: arr[root] },
                    node2: { index: root, height: arr[right] },
                });
               
                const temp = arr[right];
                arr[right] = arr[root];
                arr[root] = temp;
            }
        }
        else {
            if (arr[right] < arr[root]) {

                animationFrames.push({ type: 'invert-color', value1: right, value2: root });
                animationFrames.push({ type: 'revert-color', value1: right, value2: root });

                animationFrames.push({
                    type: 'swap-height',
                    node1: { index: right, height: arr[root] },
                    node2: { index: root, height: arr[right] },
                });
                
                const temp = arr[right];
                arr[right] = arr[root];
                arr[root] = temp;
            }
        }
    }
    heapify(size, left);
    heapify(size, right);
}