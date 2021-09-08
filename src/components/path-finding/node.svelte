<script context="module">
    import { gridStore } from './stores/grid';
    import { wallNodes } from './stores/walls';
    import { obstacles } from './stores/obstacle';
    import { visitedNodes } from './stores/visited';
    import { pathNodes } from './stores/path';
    import { PathFinding } from './stores/path-finding';
    import { PathFrames } from './SidePanel.svelte';

    let draggedElementIndex;
    let targetElementIndex;
    let mouseIsDown = false;
    let keydown = '';
    
    window.onkeydown = event => keydown = event.key;
    window.onkeyup = () => keydown = '';
    
    const populateFrames = () => {
        let frames;
        document.getElementById('populate-frames').click();
        const unsub = PathFrames.subscribe(value => frames = value);
        unsub();
        drawPath(frames);
    }
    const drawPath = frames => {
        try {
            pathNodes.clear();
            frames.forEach(index => pathNodes.add(index));
        } catch (error) {
            return;
        }
    }
</script>

<script>
    export let size; /* dimension as a square */
    export let index;

    /* Booleans */
    $: isStartingPosition = index === $gridStore.startIndex;
    $: isDestination = index === $gridStore.destinationIndex;
    $: isWall = $wallNodes.has(index);
    $: isObstacle = $obstacles.has(index);
    $: isPath = $pathNodes.has(index);
    $: isVisited = $visitedNodes.has(index);
    $: isWeighted = $PathFinding.currentAlgo.isWeighted;

    let node;

    const toggle = event => {
        if(isStartingPosition || isDestination) return;
        if(keydown == 'w' || keydown == 'W') {
            if(!isWeighted) return;
            wallNodes.remove(index);
            isObstacle ? obstacles.remove(index) : obstacles.add(index);
            populateFrames();
            return;
        }
        visitedNodes.remove(index);
        obstacles.remove(index)
        isWall ? wallNodes.remove(index) : wallNodes.add(index);
        populateFrames();
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
        populateFrames();
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
        if(!mouseIsDown || isStartingPosition || isDestination) return;

        if (keydown == 't' || keydown == 'T') {
            visitedNodes.remove(index);
            toggle();
        }
        else if(keydown == 'w') {
            if(!isWeighted) return;
            wallNodes.remove(index);
            obstacles.add(index);
        }
        else if (keydown == 'W') {
            if(!isWeighted) return;
            wallNodes.remove(index);
            isObstacle ? obstacles.remove(index) : obstacles.add(index);
        }
        else {
            visitedNodes.remove(index);
            obstacles.remove(index);
            wallNodes.add(index);
        }
        populateFrames();
    }

    $: className = `
        ${isStartingPosition ? 'start':''} 
        ${isDestination ? 'destination':''} 
        ${isWall ? 'wall':''} 
        ${isObstacle && isWeighted ? 'obstacle':''} 
        ${isPath ? 'path':''} 
        ${isVisited ? 'visited':''} 
        ${ isWeighted && isVisited && isObstacle ? 'visited-obstacle':'' }
        ${ isWeighted && isPath && isObstacle ? 'path-obstacle':'' }
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