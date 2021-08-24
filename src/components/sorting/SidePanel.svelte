<script>
    import { fillTracks, styleSelect } from "../../modules/slider";
    import { onMount, tick } from "svelte";
    import { Sorting } from "../../stores/Sorting";

    let arraySize = 100;
    let devWidth;

    $: arrayMaxSize = devWidth <= 500 ? 100 : 200;

    $: {
        Sorting.generateNewArray(arraySize);
    }

    function generate() {
        Sorting.generateNewArray(arraySize);
    }

    async function addWindow() {
        Sorting.addWindow();
        await tick();
        styleSelect();
    }

    onMount(() => {
        fillTracks();
        styleSelect();
    });
</script>

<svelte:window bind:innerWidth={devWidth} />

<button class="btns" color="accent">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#">Start Sorting!</a>
</button>
<button class="btns" color="primary" on:click={addWindow}> Add window </button>
<button class="btns" color="primary" on:click={generate}
    >Generate new array</button
>

<div title="Change array size" class="not-btn">
    <label for="array-size-slider"> Array size </label>
    <input
        type="range"
        role="slider"
        min="10"
        step="1"
        max={arrayMaxSize}
        bind:value={arraySize}
        color="accent"
        id="array-size-slider"
    />
</div>
<div title="Change sorting speed" class="not-btn">
    <label for="sorting-speed-slider"> Speed </label>
    <input
        type="range"
        role="slider"
        min="1"
        step=".1"
        max="10"
        bind:value={$Sorting.speed}
        id="sorting-speed-slider"
    />
</div>
<div title="Change sorting order" class="not-btn">
    <label for="sort-order">Ascending</label>
    <input type="checkbox" role="switch" bind:checked={$Sorting.ascending} />
</div>

<style>
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
