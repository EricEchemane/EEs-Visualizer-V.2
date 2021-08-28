import invert from 'invert-color';

export function changeColor(color, barNodeElement /* reference to bar node */, invertColor = false) {
    color = invertColor ? invert(color) : color;
    barNodeElement.style.transition = '0ms';
    barNodeElement.style.backgroundColor = color;
}

export function changeHeight(newHeight, barNodeElement) {
    barNodeElement.style.transition = '200ms ease';
    barNodeElement.style.height = `${newHeight}px`;
}