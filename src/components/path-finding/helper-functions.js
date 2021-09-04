
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

export function getSorroundingIndeces(index, columnSize) {
    return {
        up: index - columnSize,
        down: index + columnSize,
        left: index - 1,
        right: index + 1
    }
}

export class Node {
    constructor(_indexNumber) {
        this.indexNumber = _indexNumber;
        this.parent = undefined;
    }
}