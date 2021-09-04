<script>
    import { UserInputFeedback } from '../../stores/user-input-feedback';
    import { fillTracks } from "../../modules/slider";
    import { onMount } from 'svelte';

    import { wallNodes } from './stores/walls';
    import { obstacles } from './stores/obstacle';
    import { pathNodes } from './stores/path';
    import { visitedNodes } from './stores/visited';

    import { x_SearchFirst } from './algorithms/x-first-search';
    import { PathFinding } from './stores/path-finding';
    import { gridStore } from './stores/grid';
    import { animate, makeBorderWalls } from './animation-logic';

    onMount(() => {
        fillTracks();
    });

    $: xsize = $PathFinding.xsize;
    $: ysize = $PathFinding.ysize;

    const hideUserInputFeedback = () => setTimeout(UserInputFeedback.hide, 500);

    const clearAll = () => {
        obstacles.clear();
        wallNodes.clear();
        visitedNodes.clear();
        pathNodes.clear();
        makeBorderWalls(xsize, ysize);
    }

    const sampleSearch = () => {
        pathNodes.clear();
        visitedNodes.clear();
        const { searchAnimationFrames, pathAnimationFrames } = x_SearchFirst(
            xsize * ysize, 
            xsize, 
            $gridStore.destinationIndex,
            $gridStore.startIndex, 
            $wallNodes, $obstacles,
        )
        animate(searchAnimationFrames, pathAnimationFrames);
    }
</script>

<!-- choose algrotihm -->
<div class="not-btn">
    <select name="algorithm" id="algorithm-select" class="fullWidth">
        <option hidden>Choose Algorithm</option>
        <option value="3"> A* Algorithm </option>
        <option value="3"> Dijkstra's Algorithm </option>
        <option value="1"> Greedy Algorithm </option>
        <option value="1"> Breadth Search First </option>
        <option value="2"> Depth Search First </option>
    </select>
</div>

<!-- maze and patterns -->
<div class="not-btn">
    <select name="maze/wall" id="maze/wall" class="fullWidth">
        <option hidden>Generate Obstacles</option>
        <option value="3"> Recursive Division </option>
        <option value="3"> Vertical Skew </option>
        <option value="3"> Horizontal Skew </option>
        <option value="3"> Random Walls </option>
        <option value="3"> Random Weighted Nodes </option>
    </select>
</div>

<!-- Find the Path! -->
<button color="accent" class="btns" on:click={sampleSearch}> 
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" style="width: 100%; height: 100%; display: block;"> 
        Find the path! 
    </a>
</button>

<div class="two-btns">
    <!-- clear walls -->
    <button 
        color="primary" 
        on:click={() => {wallNodes.clear(); makeBorderWalls(xsize, ysize)}}> 
        Clear Walls
    </button>
    <!-- clear obstacles -->
    <button color="primary" on:click={obstacles.clear}> 
        Clear Obstacles
    </button>
</div>

<div class="two-btns">
    <!-- Clear All -->
    <button color="primary" on:click={clearAll} > Clear All </button>
    <!-- Clear path -->
    <button color="primary" on:click={pathNodes.clear}> Clear Path </button>
</div>

<div class="two-btns">    
    <button color="accent"> Pause </button>
    <button color="accent"> Stop </button>
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
        id="path-finding-speed"
        color="primary"
        min="1"
        max="10"
        step="0.5"
        role="slider"
        type="range">
</div>

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