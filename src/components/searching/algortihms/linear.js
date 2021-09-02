let animationFrames;
let arr;
let searchItem;

export function linearSearch(array, _searchItem) {
    animationFrames = [];
    arr = [...array];
    searchItem = _searchItem;

    search();

    return animationFrames;
}

function search() {
    for (let x = 0; x < arr.length; x++) {
        const num = arr[x];

        animationFrames.push({ type: 'invert-color', index: x });

        if(num == searchItem) {
            animationFrames.push({ type: 'found', index: x});
            return;
        }
    }
}