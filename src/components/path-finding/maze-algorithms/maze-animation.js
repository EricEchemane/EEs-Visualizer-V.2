import { wallNodes } from '../stores/walls';

export default function displayWalls(wallsArray) {
    toggleDisableAll();
    let iterator = 0;

    const interval = setInterval(() => {
        const { type, index } = wallsArray[iterator];
        type == 'add' ? wallNodes.add(index) : wallNodes.remove(index);
        iterator++;
        if(iterator == wallsArray.length) {
            clearInterval(interval);
            toggleDisableAll();
        }
    }, 10);
}

function toggleDisableAll() {
    const buttonPanel = document.getElementById('pfp-disable-all');
    const buttonGrid = document.getElementById('pfd-disable-grid');
    buttonPanel.click();
    buttonGrid.click();
}