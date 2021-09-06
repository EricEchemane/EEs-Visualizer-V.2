<script>
    import { UserInputFeedback } from '../../stores/user-input-feedback';
    import { fillTracks } from "../../modules/slider";
    import { onMount } from 'svelte';

    import { wallNodes } from './stores/walls';
    import { obstacles } from './stores/obstacle';
    import { pathNodes } from './stores/path';
    import { visitedNodes } from './stores/visited';

    import { PathFinding } from './stores/path-finding';
    import { gridStore } from './stores/grid';
    import { animate, makeBorderWalls, pause, resume } from './animation-logic';
    import { algorithms } from './algorithms/algorithms';
    /* Maze and Patterns */
    import { recursive_division } from './maze-algorithms/recursive-division';

    onMount(() => {
        fillTracks();
    });

    $: xsize = $PathFinding.xsize;
    $: ysize = $PathFinding.ysize;

    let paused = true;
    let playing = false;
    let disableAll = false;

    let currentAlgo;

    const clear = () => {
        wallNodes.clear();
        obstacles.clear();
        pathNodes.clear();
        visitedNodes.clear();
    }

    const hideUserInputFeedback = () => setTimeout(UserInputFeedback.hide, 500);

    const clearAll = () => {
        obstacles.clear();
        wallNodes.clear();
        visitedNodes.clear();
        pathNodes.clear();
        makeBorderWalls(xsize, ysize);
    }

    const togglePause = () => {
        if(paused) pause();
        else resume();
        paused = !paused;
    }

    const stop = () => {
        paused = true;
        playing = false;
        pause();
    }

    const search = () => {
        if(currentAlgo == 'none') {
            alert('Select an algorithm first.');
            return;
        }
        playing = true;
        pathNodes.clear();
        visitedNodes.clear();
        const { searchAnimationFrames, pathAnimationFrames } = currentAlgo.algo(
            xsize,
            ysize, 
            $gridStore.startIndex, 
            $gridStore.destinationIndex,
            $wallNodes, 
            $obstacles,
        )
        animate(searchAnimationFrames, pathAnimationFrames, stop);
    }
    const toggleDisableAll = () => disableAll = !disableAll;
</script>

<!-- choose algrotihm -->
<div class="not-btn">
    <select 
        bind:value={currentAlgo}
        name="algorithm" 
        id="algorithm-select" 
        class="fullWidth" 
        disabled={playing || disableAll}>
        <option hidden value="none">Choose Algorithm</option>
        
        {#each algorithms as algo (algo)}
            <option value={algo}> {algo.name} </option>
        {/each}
    </select>
</div>

<p style="text-align: center;"> Maze and Obstacles </p>

<!-- maze and patterns -->
<div class="two-btns" >
    <button 
        class="small"
        disabled={playing || disableAll} 
        title="Recursive Division" 
        on:click={() => {
            clear();
            makeBorderWalls(xsize, ysize);
            recursive_division(xsize, ysize);
        }}> 
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" style="width: 100%; height: 100%; display: block;"> 
            Recursive Division
        </a>
    </button>
</div>
<!-- Find the Path! -->
<button color="accent" class="btns" on:click={search} disabled={playing || disableAll}> 
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" style="width: 100%; height: 100%; display: block;"> 
        Find the path! 
    </a>
</button>

<div class="two-btns">
    <!-- clear walls -->
    <button 
        color="primary" 
        disabled={playing || disableAll}
        on:click={() => {wallNodes.clear(); makeBorderWalls(xsize, ysize)}}> 
        Clear Walls
    </button>
    <!-- clear obstacles -->
    <button color="primary" on:click={obstacles.clear} disabled={playing || disableAll}> 
        Clear Obstacles
    </button>
</div>

<div class="two-btns">
    <!-- Clear All -->
    <button color="primary" on:click={clearAll} disabled={playing || disableAll}> Clear All </button>
    <!-- Clear path -->
    <button color="primary" on:click={pathNodes.clear} disabled={playing || disableAll}> Clear Path </button>
</div>

<div class="two-btns">    
    <button 
        on:click={togglePause} 
        disabled={!playing || disableAll}
        color="{!paused ? 'primary':'accent'}" >
        {!paused ? 'Play':'Pause'}
    </button>
    <button 
        on:click={stop}
        color="accent" 
        disabled={!playing || disableAll}> Stop </button>
</div>

<!-- Speed -->
<div class="not-btn" title="Change animation speed">
    <label for="path-finding-speed"> Speed </label>
    <input 
        on:input={
        () => UserInputFeedback.set(true, `Animation Speed: ${$PathFinding.speed}`)}
        on:change={hideUserInputFeedback}
        on:blur={hideUserInputFeedback}
        bind:value={$PathFinding.speed}
        disabled={playing || disableAll}
        id="path-finding-speed"
        color="primary"
        min="1"
        max="10"
        step="0.5"
        role="slider"
        type="range">
</div>

<button hidden on:click={toggleDisableAll} id="pfp-disable-all" />

<style>
    button {
        text-overflow: ellipsis !important;
        white-space: nowrap;
        overflow: hidden;
    }
    *[disabled] {
        opacity: 0.2;
        pointer-events: none;
    }
    button[color="accent"] > a {
        color: white;
    }
    button.small a {
        color: var(--text1) !important;
        font-size: .8rem;
        /* text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden; */
    }
    button > a:hover {
        text-decoration: none;
    }
    button > a {
        color: var(--surface1);
    }
    .not-btn {
        display: flex;
        place-items: center;
        justify-content: space-between;
        border-radius: 0.25rem;
        padding: 0.7rem 0.5rem;
    }
    .not-btn:hover {
        background-color: var(--surface3);
    }
    .fullWidth {
        width: 100% !important;
    }
    .two-btns {
        padding: 0.7rem 0.5rem;
        display: grid;
        grid-template-columns: calc(50% - .5rem) calc(50% - .5rem);
        gap: 1rem;
    }
    .btns {
        margin: .7rem .5rem;
    }
 </style>