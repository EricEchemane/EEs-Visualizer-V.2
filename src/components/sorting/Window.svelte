<script>
    import { Sorting } from "../../stores/Sorting";
    import { SortingAlgortihms } from "../../modules/SortingAlgorithms";
    import { each } from "svelte/internal";

    export let indexNumber;

    $: nums = $Sorting.array;
    $: color = $Sorting.windows[indexNumber].color;
    $: algoName = $Sorting.windows[indexNumber].algo.name;
</script>

<section>
    <select
        name="algo"
        id="algo"
        bind:value={$Sorting.windows[indexNumber].algo.name}
    >
        {#each SortingAlgortihms as { name, algo }, i (i)}
            <option value={name}> {name} </option>
        {/each}
    </select>
    <div class="bars-container">
        <!--  -->
        {#each nums as num, i (i)}
            <div
                class="bar"
                style="background-color: {color}; height: {num}px"
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
    }
    .bars-container {
        height: 250px;
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
