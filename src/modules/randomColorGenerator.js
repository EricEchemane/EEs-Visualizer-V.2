import { getRandomArbitrary } from "./numberGenerator";

/* https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex */
function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

let upperColor = false;

export function generateRandomHexColor() {
    const min = upperColor ? 190 : 35;
    const max = upperColor ? 335 : 180;
    const hue = getRandomArbitrary(min, max);
    upperColor = !upperColor;
    return hslToHex(hue, 100, 50);
}
