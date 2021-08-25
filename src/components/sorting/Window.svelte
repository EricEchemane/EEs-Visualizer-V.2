<script>
    import { Sorting } from "../../stores/Sorting";
    import { SortingAlgortihms } from "../../modules/SortingAlgorithms";
    import { slide, fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let window;

    const dispatch = createEventDispatcher();

    $: nums = $Sorting.array;
    $: barClass = `bar-sorting-${window.algo.name.trim()}`;

    function removeWindow() {
        dispatch("remove", window);
    }
</script>

<section in:slide out:fly={{ x: 500 }}>
    <div class="options">
        <select name="algo" id="algo" bind:value={window.algo}>
            {#each SortingAlgortihms as algo (algo)}
                <option value={algo}>
                    {algo.name}
                </option>
            {/each}
        </select>

        <div style="display: flex; align-items: center; gap: .7rem;">
            <label for="color">Choose color </label>
            <input type="color" id="color" bind:value={window.color} />
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
                style="background-color: {window.color}; height: {num}px"
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
