<script>
    import { onMount, onDestroy } from "svelte";
    import { ActiveVisualizer } from "../../stores/active-visualizer";

    onMount(() => {
        ActiveVisualizer.set("sorting");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });
</script>

<main>
    <h1>Sorting Dashboard</h1>
</main>

<style>
    main {
        margin: 1rem;
    }
</style>
