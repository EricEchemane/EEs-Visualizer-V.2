<script>
    import { onMount } from 'svelte';
    import { Searching } from '../../stores/searching';
    import { UserInputFeedback } from '../../stores/user-input-feedback';

    import { fillTracks } from "../../modules/slider";
    import { recieveAnimationData, revertColors, Found } from './searching-animations-logic';

    onMount(() => {
        fillTracks();
    });

    const hideUserInputFeedback = (ms = 1000) => setTimeout(UserInputFeedback.hide, ms);
    
    const handleSizeChange = () => {
        hideUserInputFeedback();
        generateNewArray();
    };
    const handleSizeInput = () => UserInputFeedback.set(true, `Array Size: ${arraySize}`);
    const handleSpeedInput = () => UserInputFeedback.set(true, `Animation Speed: ${animationSpeed}`);
    
    const generateNewArray = () => Searching.generateNewArray(arraySize);
    const togglePause = () => paused = !paused;

    const search = () => {
        if(!Number.isInteger(searchItem) || Math.sign(searchItem) == -1) {
            UserInputFeedback.set(true, 'Positive integer only.');
            hideUserInputFeedback(2000);
        }
        else {
            revertColors($Searching.windows);
            Found.set({status: 'not-searched', atIndex: null});

            const animationFrames = [];
            $Searching.windows.forEach(window => 
                animationFrames.push(window.algo($Searching.array, searchItem)));

            recieveAnimationData(animationFrames, $Searching, animationSpeed);
        }
    };

    let arraySize = 130;
    let animationSpeed = 9;
    let searchItem;
    let playing = false;
    let paused = true;
</script>

<!-- search for integer -->
<div class="not-btn" title="Input an interger to search">
    <label for="search-value">Enter an Integer</label>
    <input 
        bind:value={searchItem}
        on:keypress={(event) => {if(event.key == "Enter") search()} }
        type="number" 
        placeholder="0" 
        id="search-value" 
        style="width: 10ch; text-align: center;">
</div>
<!-- Search! -->
<button class="btns" color="primary" on:click={search} disabled={!searchItem}> 
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" style="width: 100%; height: 100%; display: block;">
        Search!
    </a>
</button>

<!-- Generate new array -->
<button class="btns" color="primary" on:click={generateNewArray} disabled={playing}> 
    Generate New Array! 
</button>

<!-- Change size -->
<div class="not-btn" title="Change array size">
    <label for="array-size">Array size</label>
    <input 
        bind:value={arraySize}
        on:change={handleSizeChange}
        on:input={handleSizeInput}
        on:blur={hideUserInputFeedback}
        disabled={playing}
        type="range" 
        role="slider"
        color="accent"
        min="10"
        max="130"
        step="1"
        id="array-size">
</div>

<!-- Change speed -->
<div class="not-btn" title="Change animation speed.">
    <label for="search-speed"> Speed </label>
    <input 
        bind:value={animationSpeed}
        on:change={hideUserInputFeedback}
        on:input={handleSpeedInput}
        on:blur={hideUserInputFeedback}
        disabled={playing}
        type="range" 
        role="slider"
        color="primary"
        min="1"
        max="10"
        step="0.1"
        id="search-speed">
</div>

<!-- Pause! -->
<button class="btns" color="accent" disabled={!playing} on:click={togglePause}> 
    { (!paused || playing) ? 'Pause':'Play' } 
</button>

<!-- Stop! -->
<button class="btns" color="accent" disabled={!playing}> Stop </button>

<style>
    *[disabled] {
        opacity: 0.2;
        pointer-events: none;
    }
    /* button[color="accent"] > a {
        color: white;
    } */
    button > a:hover {
        text-decoration: none;
    }
    button > a {
        color: var(--surface1);
    }
    .btns {
        margin: 0.7rem 0.5rem;
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
</style>