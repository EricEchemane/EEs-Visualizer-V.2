<script context="module">
    import { gridStore } from './stores/grid';
    let draggedElementIndex;
    let targetElementIndex;
</script>

<script>
    export let size; /* dimension as a square */
    export let index;

    /* Booleans */
    $: isStartingPosition = index == $gridStore.startIndex;
    $: isDestination = index == $gridStore.destinationIndex;
    $: isWall = false;
    $: isWeighted = false;
    $: isPath = false;

    $: isVisited = false;

    let node;

    const handleDragLeave = event => {
        node.classList.remove('target-node');
    }
    const handleDragOver = event => {
        node.classList.add('target-node');
        targetElementIndex = index;
    }
    const handleDragEnd = event => {
        if(draggedElementIndex == $gridStore.startIndex) 
            gridStore.updateStartIndex(targetElementIndex);
        else if(draggedElementIndex == $gridStore.destinationIndex)
            gridStore.updateDestination(targetElementIndex);
    };
    const handleDragStart = event => {
        draggedElementIndex = index;
    };

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
    bind:this={node}
    on:dragend={handleDragEnd}
    on:dragover={handleDragOver}
    on:dragstart={handleDragStart}
    on:dragleave={handleDragLeave}
    draggable="{isStartingPosition || isDestination}"
    class="node {className}"  
    style="width: {size}px; height: {size}px">
</div>