
export function getInitialGrid(gridWidth, nodeSize) {
    const rowSize = Math.floor(gridWidth / nodeSize);
    const rowsLength = rowSize > 10 ? rowSize : 10;

    const grid = [];

    for (let y = 0; y < rowsLength; y++) {
        const row = [];
        for (let x = 0; x < rowSize; x++) row.push({x,y});
        grid.push(row);
    }

    return grid;
}