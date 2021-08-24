export function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function generateArray(size) {
    const nums = [];
    for (let i = 0; i < size; i++) {
        nums.push(getRandomArbitrary(1, 200));
    }
    return nums;
}
