<script>
    export let size; /* dimension as a square */

    /* Booleans */
    let isStartingPosition;
    let isDestination;
    let isWall = false;
    let isWeighted = false;
    let isPath = false;

    let isVisited = false;

    $: className = `
        ${isStartingPosition ? 'start':''} 
        ${isDestination ? 'destination':''} 
        ${isWall ? 'wall':''} 
        ${isWeighted ? 'weighted':''} 
        ${isPath ? 'path':''} 
        ${isVisited ? 'visited':''} 
    `;
</script>

<div 
    class="node {className}"  
    style="width: {size}px; height: {size}px">
</div>