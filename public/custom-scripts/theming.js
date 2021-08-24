const themeRadioButtons = document.querySelectorAll('input[name="theme"]');

themeRadioButtons.forEach((input) => {
    input.addEventListener("click", (e) => {
        setTheme(e.target.value);
    });
});
/*  
@params theme: string = 'auto' | 'light' | 'dark'
*/
function getThemeRules(theme) {
    return `
    --text1: var(--text1-${theme});
    --text2: var(--text2-${theme});
    --text3: var(--text3-${theme});
    --surface1: var(--surface1-${theme});
    --surface2: var(--surface2-${theme});
    --surface3: var(--surface3-${theme});
    --surface4: var(--surface4-${theme});
    --surface-shadow: var(--surface-shadow-${theme});
`;
}

function checkUserThemePrefrence() {
    const userPrefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const userPrefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;

    return userPrefersLight ? "light" : "dark";
}

function setTheme(theme = "dark") {
    /* checks if the theme is valid, else set to 'auto' */
    // theme =
    //     theme == "light" || theme == "dark" || theme == "dim"
    //         ? theme
    //         : checkUserThemePrefrence();

    // const sheet = document.styleSheets[0];
    // sheet.deleteRule(0);
    // sheet.insertRule(`:root {${getThemeRules(theme)}}`);

    // set select icon
    const selects = document.querySelectorAll("select");
    selects.forEach((s) => {
        const selectIconColor = theme != "light" ? "down-white" : "down";
        s.style.backgroundImage = `url(./assets/${selectIconColor}.svg)`;
        s.style.backgroundRepeat = `no-repeat`;
    });
}

function initiateTheme() {
    const newStyle = document.createElement("style");
    document.head.appendChild(newStyle);
    newStyle.sheet.insertRule(":root{}");
    setTheme();
}

initiateTheme();
