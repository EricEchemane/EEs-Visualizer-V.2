import { wallNodes } from '../stores/walls';
import { getRandomArbitrary } from '../../../modules/numberGenerator';

export function fourQuadrants(topLeftCorner, xsize, ysize, originalXSize) {
    if(xsize < 5 || ysize < 5) return;

    if(xsize % 2 == 0) xsize--;

    let leftSize = Math.floor(xsize / 2);
    let rightSize = xsize - leftSize;

    let upperSize = Math.floor(ysize / 2);
    let lowerSize = ysize - upperSize;

    const midx = topLeftCorner + leftSize;
    const midy = topLeftCorner + (originalXSize * upperSize);

    disectY(midx, ysize, originalXSize);
    disectX(midy, leftSize);
    disectX(midy + leftSize, rightSize);

    fourQuadrants(topLeftCorner, leftSize, upperSize, originalXSize);
    fourQuadrants(midx, rightSize, upperSize, originalXSize);
    fourQuadrants(midy, leftSize, lowerSize, originalXSize);
    fourQuadrants(midy + leftSize, rightSize, lowerSize, originalXSize);
}

function disectY(startIndex, length, xsize) {
    const skipIndex1 = getRandomArbitrary(1, length / 2);
    const skipIndex2 = getRandomArbitrary(length / 2, length);
    for(let y = 1; y < length; y++) {
        if(y == skipIndex1 || y == skipIndex2) continue;
        const index = startIndex + (xsize * y);
        wallNodes.add(index);
    }
}

function disectX(startIndex, length) {
    const skipIndex = getRandomArbitrary(1, length / 2);
    const skipIndex2 = getRandomArbitrary(length / 2, length);
    for(let x = 1; x < length; x++) {
        if(x == skipIndex || x == skipIndex2) continue;
        wallNodes.add(startIndex + x);
    }
}

