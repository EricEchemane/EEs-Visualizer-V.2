<script context="module">
    import { gridStore } from './stores/grid';
    import { wallNodes } from './stores/walls';
    import { obstacles } from './stores/obstacle';
    let draggedElementIndex;
    let targetElementIndex;
    let mouseIsDown = false;
    let keydown = '';

    window.onkeydown = event => keydown = event.key;
    window.onkeyup = () => keydown = '';
</script>

<script>
    export let size; /* dimension as a square */
    export let index;

    /* Booleans */
    $: isStartingPosition = index === $gridStore.startIndex;
    $: isDestination = index === $gridStore.destinationIndex;
    $: isWall = $wallNodes.has(index);
    $: isObstacle = $obstacles.has(index);
    $: isPath = false;

    $: isVisited = false;

    let node;

    const toggle = event => {
        if(isStartingPosition || isDestination) return;

        if(keydown == 'o') {
            isObstacle ? obstacles.remove(index) : obstacles.add(index);
            return;
        }

        isWall ? wallNodes.remove(index) : wallNodes.add(index);
    }
    const handleDragLeave = event => {
        node.classList.remove('target-node');
    }
    const handleDragOver = event => {
        if( draggedElementIndex != $gridStore.startIndex 
        && draggedElementIndex != $gridStore.destinationIndex) return;
        node.classList.add('target-node');
        targetElementIndex = index;
    }
    const handleDragEnd = event => {
        mouseIsDown = false;
        wallNodes.remove(index);
        obstacles.remove(index);
        if(draggedElementIndex == $gridStore.startIndex) 
            gridStore.updateStartIndex(targetElementIndex);
        else if(draggedElementIndex == $gridStore.destinationIndex)
            gridStore.updateDestination(targetElementIndex);
    };
    const handleDragStart = event => {
        if(!(isStartingPosition || isDestination)) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        draggedElementIndex = index;
    };
    const handleMouseOver = event => {
        if(!mouseIsDown) return;
        toggle();
    }

    $: className = `
        ${isStartingPosition ? 'start':''} 
        ${isDestination ? 'destination':''} 
        ${isWall ? 'wall':''} 
        ${isObstacle ? 'obstacle':''} 
        ${isPath ? 'path':''} 
        ${isVisited ? 'visited':''} 
    `;
</script>

<div 
    bind:this={node}
    on:mouseenter={handleMouseOver}
    on:dragend={handleDragEnd}
    on:dragover={handleDragOver}
    on:dragstart={handleDragStart}
    on:dragleave={handleDragLeave}
    on:click={toggle}
    on:mousedown={() => mouseIsDown = true}
    on:mouseup={() => mouseIsDown = false}
    draggable={isStartingPosition || isDestination}
    class="node {className}"  
    style="width: {size}px; height: {size}px">
</div>