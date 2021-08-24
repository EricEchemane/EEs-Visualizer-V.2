export function fillTracks() {
    const sliders = document.querySelectorAll('input[type="range"]');

    const rangeToPercent = (slider) => {
        const max = slider.getAttribute("max");
        const percent = (slider.value / max) * 100;

        return `${parseInt(percent)}%`;
    };

    sliders.forEach((slider) => {
        slider.style.setProperty("--track-fill", rangeToPercent(slider));

        slider.addEventListener("input", (e) => {
            e.target.style.setProperty(
                "--track-fill",
                rangeToPercent(e.target)
            );
        });
    });

    const selects = document.querySelectorAll("select");
    selects.forEach((s) => {
        s.style.backgroundImage = `url(./assets/down-white.svg)`;
        s.style.backgroundRepeat = `no-repeat`;
    });
}
