
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

export function getNeighborNodes(nodes, columnSize, index) {
    return {
        from: nodes[index],
        up: nodes[index - columnSize],
        down: nodes[index + columnSize],
        left: nodes[index - 1],
        right: nodes[index + 1],
    }
}