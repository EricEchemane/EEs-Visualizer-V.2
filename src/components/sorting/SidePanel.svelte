<script>
    import { fillTracks, styleSelect } from "../../modules/slider";
    import { onMount, tick } from "svelte";
    import { Sorting } from "../../stores/Sorting";
    import { fade } from "svelte/transition";
    import { UserInputFeedback } from "../../stores/user-input-feedback";

    let arraySize = 100;
    let paused;

    /* These expressions will run every time arraySize is changed */
    $: Sorting.generateNewArray(arraySize)

    function sort() {
        alert('sort called')
    }

    function hideFeedback() {
        setTimeout(() => UserInputFeedback.hide(), 1000);
    }

    function onSizeInput() {
        UserInputFeedback.set(true, `Array size: ${arraySize}`);
    }
    function onSpeedInput() {
        UserInputFeedback.set(true, `Speed: ${$Sorting.speed}`);
    }
    function onSortOrderInput() {
        UserInputFeedback.set(
            true,
            !$Sorting.ascending ? "Ascending" : "Descending"
        );
        setTimeout(() => UserInputFeedback.hide(), 1100);
    }

    function generate() {
        Sorting.generateNewArray(arraySize);
    }

    async function addWindow() {
        Sorting.addWindow();

        /* await the addWindow micro task before 
        scrollihg and styling the select drop down arrow */
        await tick();

        styleSelect();
        setTimeout(() => {
            scrollTheMainToBottom();
        }, 300);
    }

    /* react the window container scroll position to incoming windows */
    function scrollTheMainToBottom() {
        const main = document.getElementById("main");
        main.scrollTo(0, main.scrollHeight);
    }

    onMount(() => {
        fillTracks();
        /* fillTracks() is needed when using a slider or input range
        so that the range track progress will react to changes */

        styleSelect();
        UserInputFeedback.set(false, ``);
    });
</script>

<button class="btns" color="accent" transition:fade on:click={sort}>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" style="width: 100%; height: 100%; display: block;"
        >Start Sorting!</a
    >
</button>
<button class="btns" color="primary" on:click={addWindow} transition:fade>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
        href="#"
        style="color: var(--surface4); width: 100%; height: 100%; display: block;"
        >Add window</a
    >
</button>
<button class="btns" color="primary" on:click={generate} transition:fade
    >Generate new array</button
>

<div title="Change array size" class="not-btn" transition:fade>
    <label for="array-size-slider"> Array size </label>
    <input
        type="range"
        role="slider"
        min="10"
        step="1"
        max="200"
        bind:value={arraySize}
        on:change={hideFeedback}
        on:input={onSizeInput}
        color="accent"
        id="array-size-slider"
    />
</div>
<div title="Change sorting speed" class="not-btn" transition:fade>
    <label for="sorting-speed-slider"> Speed </label>
    <input
        type="range"
        role="slider"
        min="1"
        max="10"
        bind:value={$Sorting.speed}
        on:change={hideFeedback}
        on:input={onSpeedInput}
        id="sorting-speed-slider"
    />
</div>
<div title="Change sorting order" class="not-btn" transition:fade>
    <label for="sort-order">Ascending</label>
    <input
        id="sort-order"
        type="checkbox"
        role="switch"
        bind:checked={$Sorting.ascending}
        on:input={onSortOrderInput}
    />
</div>
<div title="Pause sorting" class="not-btn" transition:fade>
    <label for="pause-sorting">Pause</label>
    <input
        id="pause-sorting"
        type="checkbox"
        role="switch"
        color="accent"
        bind:checked={paused}
    />
</div>

<style>
    *[disabled] {
        opacity: 0.5;
        pointer-events: none;
    }
    button[color="accent"] > a {
        color: white;
    }
    button > a:hover {
        text-decoration: none;
    }
    .btns {
        margin: 0.7rem 0.5rem;
    }
    .not-btn {
        display: flex;
        place-items: center;
        justify-content: space-between;
        border-radius: 0.25rem;
        padding: 0.7rem 0.5rem;
    }
    .not-btn:hover {
        background-color: var(--surface3);
    }
</style>
