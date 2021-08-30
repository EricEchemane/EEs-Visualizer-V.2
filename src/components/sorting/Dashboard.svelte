<script>
    import { onMount, onDestroy } from "svelte";
    import { ActiveVisualizer } from "../../stores/active-visualizer";
    import { Sorting } from "../../stores/Sorting";
    import SortingWindows from "./Window.svelte";
    import { fade } from "svelte/transition";

    onMount(() => {
        ActiveVisualizer.set("sorting");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });
</script>

<main transition:fade={{ duration: 100 }}>
    <div class="header">
        <h2>Sorting Dashboard</h2>
        <div>
            <label for="sort-by-speed">Rank by Speed</label>
            <input type="checkbox" role="switch" id="sort-by-speed">
        </div>
    </div>

    {#each $Sorting.windows as window (window)}
        <SortingWindows {window} />
    {:else}
        <h1 style="text-align: center; margin: auto;"
            in:fade={{ duration: 500 }} >
            Add Window !
        </h1>
    {/each}
</main>

<style>
    main {
        padding: 1rem;
    }
    .header h2 {
        font-weight: 500;
    }
    .header, .header > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .header {
        margin-bottom: 2rem;
        justify-content: space-between;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
        .header {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
