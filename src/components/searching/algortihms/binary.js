let animationFrames;
let arr;
let searchItem;

export function binarySearch(array, _searchItem) {
    animationFrames = [];
    arr = [...array];
    arr.sort((a, b) => a-b);
    searchItem = _searchItem;

    search();

    return animationFrames;
}

function search() {
    let leftIdx = 0;
    let rightIdx = arr.length;
    let midIdx = (leftIdx + rightIdx) / 2;
    midIdx = Math.floor(midIdx);

    while(leftIdx <= rightIdx) {

        animationFrames.push({ type: 'invert-color', index: midIdx });

        if(arr[midIdx] == searchItem) {
            animationFrames.push({ type: 'found', index: midIdx });
            return;
        }
        else if(searchItem < arr[midIdx]) {
            rightIdx = midIdx - 1;
            midIdx = (leftIdx + rightIdx) / 2;
            midIdx = Math.floor(midIdx);
        }
        else if(searchItem > arr[midIdx]) {
            leftIdx = midIdx + 1;
            midIdx = (leftIdx + rightIdx) / 2;
            midIdx = Math.floor(midIdx);
        }
    }
}