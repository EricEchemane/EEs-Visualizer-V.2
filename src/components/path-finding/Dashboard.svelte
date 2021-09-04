<script>
    import { onMount, onDestroy } from 'svelte';
    import { ActiveVisualizer } from '../../stores/active-visualizer';
    import { getInitialGrid } from './helper-functions';
    import { gridStore } from './stores/grid';
    
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

        gridStore.set(0, ((columnSize * rowSize) - 1) - (columnSize * 2));

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
                <Node size={nodeSize} index={(columnSize * y) + x} />
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
        position: relative;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
        .grid {
            height: 65vh;
        }
    }
    :global(.destination), :global(.start) {
        background-color: var(--text1);
        border-radius: 50%;
        animation: breath 2s infinite ease;
        z-index: 2;
        cursor: pointer;
    }
    :global(.destination)::after, :global(.start)::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        background-color: var(--surface1);
        top: 2px;
        bottom: 2px;
        left: 2px;
        right: 2px;
    }
    :global(.destination)::before, :global(.start)::before {
        content: '';
        position: absolute;
        border-radius: 50%;
        background-color: var(--text1);
        top: 6px;
        bottom: 6px;
        right: 6px;
        left: 6px;
        z-index: 2;
    }
    :global(.start), :global(.start)::before {
        background-color: lime;
    }
    :global(.target-node) {
        transform: scale(1.5);
        border: 1px solid white;
        border-radius: 50%;
        z-index: 3;
    }
</style>