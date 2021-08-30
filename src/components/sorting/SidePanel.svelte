<script>
    import { fillTracks } from "../../modules/slider";
    import { onMount, tick } from "svelte";
    import { Sorting } from "../../stores/Sorting";
    import { fade } from "svelte/transition";
    import { UserInputFeedback } from "../../stores/user-input-feedback";
    import { recieveAnimationData, pause, animate } from './sorting-animation-logic';
    import { AnimationObserver } from '../../stores/animations-observer';

    let arraySize = 100;
    let paused = false;
    let playing = false;

    /* These expressions will run every time arraySize is changed */
    $: Sorting.generateNewArray(arraySize);
    $: {
        const completed = $AnimationObserver.length == $Sorting.windows.length;
        if(completed) {
            playing = false;
            disableCloseButtons(false);
        }
        stopTimerOfFinishedAnimation();
    }

    function stopAndReset() {
        paused = false;
        playing = false;
        disableCloseButtons(false);
        pause();
        resetTimers();
        stopTimers();
        Sorting.generateNewArray(arraySize);
    }

    function disableCloseButtons(disable = true) {
        const closeBtns = document.querySelectorAll('.sort-close-window');
        disable ? 
            closeBtns.forEach(each => each.classList.add('disabled')) :
            closeBtns.forEach(each => each.classList.remove('disabled'))
    }

    function resetTimers() {
        $Sorting.windows.forEach(each => {
            const resetButtonId = `timer-reset-${each.algo.name}`;
            document.getElementById(resetButtonId)?.click();
        })
    }

    function stopTimerOfFinishedAnimation() {
        $AnimationObserver.forEach(each => {
            const stopButtonId = `timer-stop-${each}`;
            document.getElementById(stopButtonId)?.click();
        })
    }

    function startTimer() {
        disableCloseButtons();
        $Sorting.windows.forEach(window => {
            const startButtonId = `timer-start-${window.algo.name}`;
            document.getElementById(startButtonId).click();
        });
    }

    function stopTimers() {
        $Sorting.windows.forEach(window => {
            const stopButtonId = `timer-stop-${window.algo.name}`;
            document.getElementById(stopButtonId).click();
        })
    }

    function togglePause(){
        paused = !paused;
        if(paused) {
            pause();
            stopTimers();
        } else {
            startTimer();
            animate();
        }
        UserInputFeedback.set(true, paused ? 'Paused':'Play');
        setTimeout(() => UserInputFeedback.hide(), 1000);
    }

    function sort() {
        AnimationObserver.set([]);

        playing = true;
        const animationFrames = [];
        const array = $Sorting.array;
        const ascending = !$Sorting.ascending;
        
        $Sorting.windows.forEach(window => {
            const frames = window.algo.algo(array, ascending);
            animationFrames.push(frames);
        })
        recieveAnimationData(animationFrames, $Sorting);
        resetTimers();
        startTimer();
    }

    function hideFeedback() {
        setTimeout(() => UserInputFeedback.hide(), 1000);
    }

    function onSizeInput() {
        UserInputFeedback.set(true, `Array size: ${arraySize}`);
    }
    function onSpeedInput() {
        UserInputFeedback.set(true, `Speed: ${$Sorting.speed}`);
    }
    function onSortOrderInput() {
        UserInputFeedback.set(
            true,
            !$Sorting.ascending ? "Ascending" : "Descending"
        );
        setTimeout(() => UserInputFeedback.hide(), 1100);
    }

    function generate() {
        Sorting.generateNewArray(arraySize);
    }

    async function addWindow() {
        Sorting.addWindow();
        
        /* await the addWindow micro task before 
        scrollihg and styling the select drop down arrow */
        await tick();

        setTimeout(() => {
            scrollTheMainToBottom();
        }, 100);
    }

    /* react the window container scroll position to incoming windows */
    function scrollTheMainToBottom() {
        const main = document.getElementById("main");
        main.scrollTo(0, main.scrollHeight);
    }

    onMount(() => {
        fillTracks();
        /* fillTracks() is needed when using a slider or input range
        so that the range track progress will react to changes */

        UserInputFeedback.set(false, ``);
    });
</script>

<button 
    class="btns" 
    color="accent" 
    transition:fade 
    on:click={sort} disabled={paused || playing}>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" style="width: 100%; height: 100%; display: block;">
        Start Sorting!
    </a>
</button>

<button 
    class="btns" color="primary" 
    on:click={addWindow} 
    transition:fade 
    disabled={playing}>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a  href="#" style="
            color: var(--surface4); 
            width: 100%; 
            height: 100%; 
            display: block;">
        Add window</a>
</button>

<button class="btns" color="primary" 
        on:click={generate} 
        transition:fade disabled={playing}>
        Generate new array
</button>

<div title="Change array size" class="not-btn" transition:fade>
    <label for="array-size-slider"> Array size </label>
    <input
        type="range"
        role="slider"
        min="10"
        step="1"
        max="130"
        bind:value={arraySize}
        on:mouseleave={hideFeedback}
        on:change={hideFeedback}
        on:input={onSizeInput}
        disabled={playing}
        color="accent"
        id="array-size-slider" />
</div>

<div title="Change sorting speed" class="not-btn" transition:fade>
    <label for="sorting-speed-slider"> Speed </label>
    <input
        type="range"
        role="slider"
        min="1"
        max="10"
        step=".1"
        bind:value={$Sorting.speed}
        on:mouseleave={hideFeedback}
        on:change={hideFeedback}
        on:input={onSpeedInput}
        disabled={playing}
        id="sorting-speed-slider" />
</div>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#">
    <div title="Change sorting order" class="not-btn" transition:fade>
        <label for="sort-order">Ascending</label>
        <input
            id="sort-order"
            type="checkbox"
            role="switch"
            bind:checked={$Sorting.ascending}
            on:input={onSortOrderInput}
            disabled={playing}/>
    </div>
</a>

<button 
    class="btns" 
    color={paused ? "primary":"accent"} 
    on:click={togglePause} 
    transition:fade 
    disabled={!playing}>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a  href="#" style="
            color: { paused ? 'var(--surface4)':''}; 
            width: 100%; 
            height: 100%; 
            display: block;">
            {!paused ? 'Pause':'Play'}
    </a>
</button>

<button 
    class="btns" color="accent" 
    on:click={stopAndReset} 
    transition:fade 
    disabled={!paused && !playing}>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a  href="#"
        style="width: 100%; height: 100%; display: block;">
        Stop and Reset
    </a>
</button>

<style>
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
