<script>
    import { Sorting } from "../../stores/Sorting";
    import { SortingAlgortihms } from "../../modules/SortingAlgorithms";
    import { slide, fly } from "svelte/transition";

    export let window;

    $: nums = $Sorting.array;
    
    /* This class will be used to target the bar nodes in each window */
    $: barClass = `bar-sorting-${window.algo.name}`;

    function removeWindow() {
        Sorting.removeOne(window);
    }
</script>

<section in:slide out:fly={{ x: 300 }}>
    <div class="options">
        <select
            name="algo"
            id="algo"
            bind:value={window.algo}
            title="Choose which sorting algorithm to use in this window. Current: {window
                .algo.name}"
        >
            {#each SortingAlgortihms as algo (algo)}
                <option value={algo}>
                    {algo.name}
                </option>
            {/each}
        </select>

        <input
            type="color"
            id="color"
            bind:value={window.color}
            title="Choose color"
        />

        <div style="flex: 1 1 auto;" />
        <button class="close-window" title="Close this window" on:click={removeWindow}
            >&times;</button
        >
    </div>

    <div class="timer">
        00:00:00
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
    .timer {
        margin-top: 1rem;
        color: var(--text1);
    }
    section {
        background-image: linear-gradient(var(--surface2), var(--surface1));
        border-radius: 0.5rem;
        overflow: hidden;
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
    .close-window {
        width: 1.7rem;
        height: 1.7rem;
        padding: 0 !important;
        border-radius: 50%;
        line-height: 0;
        font-size: 1.5rem;
    }
</style>
