<script>
    import { Sorting } from "../../stores/Sorting";
    import { SortingAlgortihms } from "../../modules/SortingAlgorithms";
    import { slide, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let indexNumber;
    export let color;
    export let algo;

    const dispatch = createEventDispatcher();

    $: nums = $Sorting.array;
    $: barClass = `bar-${indexNumber}`;

    function removeWindow() {
        dispatch("remove", indexNumber);
    }
</script>

<section in:slide out:fly={{ x: 500 }}>
    <div class="options">
        <select
            name="algo"
            id="algo"
            bind:value={$Sorting.windows[indexNumber].algo.name}
        >
            {#each SortingAlgortihms as algo}
                <option value={algo.name}>
                    {algo.name}
                </option>
            {/each}
        </select>

        <div style="display: flex; align-items: center; gap: .7rem;">
            <label for="color">Choose color </label>
            <input
                type="color"
                id="color"
                bind:value={$Sorting.windows[indexNumber].color}
            />
        </div>
        <div style="flex: 1 1 auto;" />
        <button title="Close this window" on:click={removeWindow}
            >&times;</button
        >
    </div>

    <div class="bars-container">
        <!--  -->
        {#each nums as num, i (i)}
            <div
                class="bar {barClass}"
                style="background-color: {color}; height: {num}px"
            />
        {/each}
    </div>
</section>

<style>
    section {
        background-image: linear-gradient(var(--surface2), var(--surface1));
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 0 0 0.5px var(--text3);
        padding: 1rem;
        margin: 2rem 0;
    }
    .options {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }
    .bars-container {
        height: 230px;
        display: flex;
        align-items: flex-end;
        margin: auto;
        position: relative;
    }
    .bar {
        flex: 2 1 auto;
        margin: 1px;
        transition: 0.2s ease;
    }
</style>
