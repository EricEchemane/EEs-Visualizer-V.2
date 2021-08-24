<script>
    import { Sorting } from "../../stores/Sorting";
    import { SortingAlgortihms } from "../../modules/SortingAlgorithms";
    import { slide } from "svelte/transition";

    export let indexNumber;

    $: nums = $Sorting.array;
    $: barClass = `bar-${indexNumber}`;
</script>

<section transition:slide>
    <div class="options">
        <select
            name="algo"
            id="algo"
            bind:value={$Sorting.windows[indexNumber].algo.name}
        >
            {#each SortingAlgortihms as { name, algo }, i (i)}
                <option value={name}>
                    {name}
                </option>
            {/each}
        </select>

        <div>
            <label for="color">Color </label>
            <input
                type="color"
                id="color"
                bind:value={$Sorting.windows[indexNumber].color}
            />
        </div>
    </div>

    <div class="bars-container">
        <!--  -->
        {#each nums as num, i (i)}
            <div
                class="bar {barClass}"
                style="background-color: {$Sorting.windows[indexNumber]
                    .color}; height: {num}px"
            />
        {/each}
    </div>
</section>

<style>
    section {
        background-image: linear-gradient(var(--surface2), rgba(0, 0, 0, 0.2));
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 0 0 0.5px var(--text3);
        padding: 1rem;
        margin: 2rem 0;
    }
    .options {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .bars-container {
        height: 220px;
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
