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
    <h2>Sorting Dashboard</h2>

    {#each $Sorting.windows as window, i (window)}
        <SortingWindows {window} />
    {:else}
        <h1
            style="text-align: center; margin: auto;"
            in:fade={{ duration: 500 }}
        >
            Add Window !
        </h1>
    {/each}
</main>

<style>
    main {
        padding: 1rem;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
    }
    h2 {
        font-weight: 500;
        margin-bottom: 2rem;
    }
</style>
