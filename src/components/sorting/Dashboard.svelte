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

    function handleRemove(event) {
        Sorting.removeOne(event.detail);
    }
</script>

<main transition:fade>
    <h2>Sorting Dashboard</h2>
    <!-- this is the container of the bars -->

    {#each $Sorting.windows as window, i (window)}
        <SortingWindows on:remove={handleRemove} {window} />
    {:else}
        <p in:fade={{ duration: 500 }}>Add window !</p>
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
