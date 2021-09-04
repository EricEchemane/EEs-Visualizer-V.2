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

        gridStore.set((columnSize * 2), ((columnSize * rowSize) - 1) - (columnSize * 2));

        /* this will cause to recalculate the grid 
        dimensions for better view on diff. viewport sizes */
        window.addEventListener('resize', reload);

        /* collect all nodes */
        window.onload = () => nodes = document.getElementsByClassName('node');
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
        window.removeEventListener('resize', reload);
    });

    const reload = () => window.location.reload();
    const generateGrid = () => {
        gridWidth = gridContainer.clientWidth;
        gridHeight = gridContainer.clientHeight;
        return getInitialGrid(gridWidth, gridHeight, nodeSize);
    }
</script>

<main>
    <h4 id="legend"> LEGEND </h4>
    <div class="header flex-center">
        <div class="flex-center">
            <div class="node"/>
            Node
        </div>
        <div class="flex-center">
            <div class="node wall"></div>
            Wall
        </div>
        <div class="flex-center">
            <div class="node obstacle"></div>
            Obstacle
        </div>
        <div class="flex-center">
            <div class="node start"/>
            Start Node
        </div>
        <div class="flex-center">
            <div class="node destination"/>
            Destination Node
        </div>
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
    #legend {
        margin-bottom: 1rem;
    }
    .flex-center {
        display: flex;
        gap: .5rem;
        align-items: center;
        flex-wrap: wrap;
    }
    .header {
        gap: 1.5rem;
    }
    .grid {
        height: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 2rem;
        height: 65vh;
    }
    main {
        padding: 1rem;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
    }
    .node {
        width: 20px;
        height: 20px;
    }
</style>