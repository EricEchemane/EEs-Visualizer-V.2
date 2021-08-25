export function algoIsUsed(algoName /* string */, windowsArray /* window[] */) {
    for (let i = 0; i < windowsArray.length; i++) {
        const window = windowsArray[i];
        if (window.algo.name == algoName) return true;
    }
    return false;
}
