<script>
    import { onMount, onDestroy } from 'svelte';
    import { ActiveVisualizer } from '../../stores/active-visualizer';
    import { getInitialGrid } from './helper-functions';
    
    import Node from './node.svelte';

    let nodeSize = 20;

    let gridContainer;
    /* Dimensions of gridContainer */
    let gridWidth;
    let gridHeight;
    
    let grid = [];

    let columnSize; /* number of nodes in x axis */
    let rowSize; /* number of nodes in y axis */

    let nodes; /* node elements */

    onMount(() => {
        ActiveVisualizer.set("path-finding");

        const gridInfo = generateGrid();

        grid = gridInfo.grid;
        columnSize = gridInfo.rowSize; /* number of nodes in x axis */
        rowSize = gridInfo.rowsLength; /* number of nodes in y axis */

        /* this will cause to recalculate the grid 
        dimensions for better view on diff. viewport sizes */
        window.onresize = () => window.location.reload();

        /* collect all nodes */
        window.onload = () => nodes = document.getElementsByClassName('node');
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

    const generateGrid = () => {
        gridWidth = gridContainer.clientWidth;
        gridHeight = gridContainer.clientHeight;
        return getInitialGrid(gridWidth, gridHeight, nodeSize);
    }
</script>

<main>
    <div class="header">
        <h4> LEGENDS </h4>
    </div>

    <div class="grid" bind:this={gridContainer}>
        {#each grid as rows, y (rows)}
            {#each rows as row, x (row)}
                <Node size={nodeSize} />
            {/each}
        {/each}
    </div>
</main>

<style>
    .grid {
        height: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 2rem;
        height: 70vh;
    }
    main {
        padding: 1rem;
    }
    :global(.node) {
        border: 1px solid var(--surface4);
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
        .grid {
            height: 60vh;
        }
    }
</style>