<script>
    import { onMount, onDestroy } from "svelte";
    import { ActiveVisualizer } from "../../stores/active-visualizer";
    import { Sorting } from "../../stores/Sorting";
    import SortingWindows from "./Window.svelte";

    onMount(() => {
        ActiveVisualizer.set("sorting");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

    $: windows = $Sorting.windows;
</script>

<main>
    <h2>Sorting Dashboard</h2>
    <!-- this is the container of the bars -->

    {#each windows as window, i (i)}
        <SortingWindows indexNumber={i} />
    {/each}
</main>

<style>
    main {
        padding: 1rem;
    }
    h2 {
        font-weight: 500;
        margin-bottom: 2rem;
    }
</style>
