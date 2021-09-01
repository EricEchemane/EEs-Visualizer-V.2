<script>
    import { onMount, onDestroy } from 'svelte';

    import { ActiveVisualizer } from '../../stores/active-visualizer';

    onMount(() => {
        ActiveVisualizer.set("searching");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });
</script>

<main>
    <div class="header">
        <h2> Searching </h2>
    </div>
</main>

<style>
    main {
        padding: 1rem;
    }
    .header h2 {
        font-weight: 500;
    }
</style>