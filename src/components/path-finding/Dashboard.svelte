<script>
    import { onMount, onDestroy } from 'svelte';
    import { ActiveVisualizer } from '../../stores/active-visualizer';
    import { getInitialGrid } from './helper-functions';
    
    import Node from './node.svelte';

    let nodeSize = 16;
    let gridWidth;
    let gridContainer;
    let grid = [];

    onMount(() => {
        ActiveVisualizer.set("path-finding");
        grid = generateGrid();
        window.onresize = () => grid = generateGrid();
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

    const generateGrid = () => {
        gridWidth = gridContainer.clientWidth;
        return getInitialGrid(gridWidth, nodeSize);
    }
</script>

<main>
    <div class="header">
        <h4> LEGENDS </h4>
    </div>
    <section>
        <div class="grid" bind:this={gridContainer}>

        </div>
    </section>
</main>

<style>
    .grid {
        height: auto;
    }
    section {
        margin-top: 2rem;
        padding: 1rem;
        height: auto;
        background-image: linear-gradient(var(--surface2), var(--surface1));
    }
    main {
        padding: 1rem;
    }
    :global(.node) {
        border: 1px solid var(--text3);
    }
</style>