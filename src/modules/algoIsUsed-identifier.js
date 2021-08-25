/* checks if an algo is present on the array */
export function algoIsUsed(algoName /* string */, array) {
    for (let i = 0; i < array.length; i++) {
        const window = array[i];
        if (window.algo.name == algoName) return true;
    }
    return false;
}
