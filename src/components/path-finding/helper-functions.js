
export function getInitialGrid(gridWidth, gridHeight, nodeSize) {
    const rowSize = Math.floor(gridWidth / nodeSize);
    const rowsLength = Math.floor(gridHeight / nodeSize);

    const grid = [];

    for (let y = 0; y < rowsLength; y++) {
        const row = [];
        for (let x = 0; x < rowSize; x++) row.push({x,y});
        grid.push(row);
    }

    return {grid, rowSize, rowsLength};
}

export function getSorroundingIndeces(index, columnSize, asArray = false) {
    let up = index - columnSize;
    let down = index + columnSize;
    let left = index - 1;
    let right = index + 1;
    return asArray ? [up, down,right, left] : { up, down, left, right };
}

export class Node {
    constructor(_indexNumber) {
        this.indexNumber = _indexNumber;
        this.parent = undefined;
        this.distance = Number.POSITIVE_INFINITY
    }
}