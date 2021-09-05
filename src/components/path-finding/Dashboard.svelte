<script>
    import { onMount, onDestroy } from 'svelte';
    import { ActiveVisualizer } from '../../stores/active-visualizer';
    import { getInitialGrid } from './helper-functions';
    import { gridStore } from './stores/grid';
    import { PathFinding } from './stores/path-finding';
    import { makeBorderWalls } from './animation-logic';
    
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

        
        PathFinding.setGridSize(columnSize,rowSize);
        
        gridStore.set((columnSize * 4) + 6, (((columnSize * rowSize) - 1) - (columnSize * 4)) - 2);
        makeBorderWalls(columnSize, rowSize);

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
            <div class="_node"/>
            Node
        </div>
        <div class="flex-center">
            <div class="_node wall"></div>
            Wall
        </div>
        <div class="flex-center">
            <div class="_node obstacle"></div>
            Obstacle
        </div>
        <div class="flex-center">
            <div class="_node start"/>
            Start Node
        </div>
        <div class="flex-center">
            <div class="_node destination"/>
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
        display: flex;
        flex-wrap: wrap;
        margin-top: 2rem;
        height: 65vh;
        gap: 0;
        border-spacing: 0;
    }
    main {
        padding: 1rem;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
    }
    ._node {
        width: 20px;
        height: 20px;
        border: 1px solid var(--surface4);
    }
</style>