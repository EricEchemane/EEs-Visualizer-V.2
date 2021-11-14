import invert from 'invert-color';

export function changeColor(color, barNodeElement /* reference to bar node */, invertColor) {
    color = invertColor ? invert(color) : color;
    barNodeElement.style.transition = '0ms';
    barNodeElement.style.backgroundColor = color;
    setTimeout(() => barNodeElement.style.transition = '200ms ease', 500);
}

export function changeHeight(newHeight, barNodeElement) {
    barNodeElement.style.transition = '200ms ease';
    barNodeElement.style.height = `${newHeight}px`;
}

export function swapHeight(barNodeElement1, barNodeElement2) {
    const height1 = barNodeElement1.style.height;
    const height2 = barNodeElement2.style.height;
    barNodeElement1.style.transition = '200ms ease';
    barNodeElement2.style.transition = '200ms ease';
    barNodeElement1.style.height = height2;
    barNodeElement2.style.height = height1;
}