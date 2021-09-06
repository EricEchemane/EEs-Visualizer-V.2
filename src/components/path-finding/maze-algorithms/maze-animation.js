import { wallNodes } from '../stores/walls';

export default function displayWalls(wallsArray) {
    let iterator = 0;

    const interval = setInterval(() => {
        const { type, index } = wallsArray[iterator];
        type == 'add' ? wallNodes.add(index) : wallNodes.remove(index);
        iterator++;
        if(iterator == wallsArray.length) clearInterval(interval);
    }, 20);
}