<script>
    import { Sorting } from "../../stores/Sorting";
    import { SortingAlgortihms } from "../../modules/SortingAlgorithms";
    import { slide, fly } from "svelte/transition";
    import { AnimationObserver } from '../../stores/animations-observer';

    export let window;

    let innerWidth;

    let timer = "00:00:00";
    let mill_int = 0, sec_int = 0, min_int = 0;
    let mill = '00', sec = '00', min = '00';
    let timerInterval;

    $: nums = $Sorting.array;
    
    /* This class will be used to target the bar nodes in each window */
    $: barClass = `bar-sorting-${window.algo.name}`;

    function stopTimer() { clearInterval(timerInterval) };

    function resetTimer() {
        mill_int = 0, sec_int = 0, min_int = 0;
        mill = '00', sec = '00', min = '00';
        timer = "00:00:00";
    }

    function startTimer(){

        /* check first if this window is already finished animating */
        const x = $AnimationObserver.indexOf(window.algo.name);
        if(x != -1) return;

        stopTimer();

        timerInterval = setInterval(() => {
            mill_int++;

            mill = mill_int <= 9 ? `0${mill_int}` : mill_int;

            if(mill_int > 99) {
                sec_int++;
                mill_int = 0;
                mill = '00';
            }

            sec = sec_int > 9 ? sec_int : `0${sec_int}`;

            if(sec_int > 59) {
                min_int++;
                sec_int = 0;
                sec = "00";
                min = `0${min_int}`;
            }

            timer = `${min}:${sec}:${mill}`;
        },10);
    }

    function removeWindow() { Sorting.removeOne(window); }
</script>

<svelte:window bind:innerWidth={innerWidth} />

<section in:slide={{duration: 100}} out:fly={{ x: 300 }}>
    <!-- hidden buttons: These will be targeted in side panel -->
    <button on:click={startTimer} hidden id="timer-start-{window.algo.name}">Start</button>
    <button on:click={stopTimer} hidden id="timer-stop-{window.algo.name}">Stop</button>
    <button on:click={resetTimer} hidden id="timer-reset-{window.algo.name}">reset</button>

    <div class="options">
        <select
            name="algo"
            id="algo"
            bind:value={window.algo}
            title="Choose which sorting algorithm to use in this window. Current: {window.algo.name}">
            
            {#each SortingAlgortihms as algo (algo)}
                <option value={algo}>
                    {algo.name}
                </option>
            {/each}
        </select>

        <input
            type="color"
            id="color"
            bind:value={window.color}
            title="Choose color"
        />

        <div class="timer" hidden={innerWidth <= 500}>
            {timer}
        </div>

        <div style="flex: 1 1 auto;" />
        <button 
            class="sort-close-window" 
            title="Close this window" 
            on:click={removeWindow}>
            &times;
        </button>
    </div>

    <div class="timer" hidden={innerWidth > 500}>
        {timer}
    </div>

    <div class="bars-container">
        <!--  -->
        {#each nums as num, i (i)}
            <div
                class="bar {barClass}"
                style="background-color: {window.color}; height: {num}px"
            />
        {/each}
    </div>
</section>  

<style>
    .disabled {
        pointer-events: none;
        opacity: 0.2;
    }
    .timer {
        margin-top: 1rem;
        color: var(--text1);
    }
    section {
        background-image: linear-gradient(var(--surface2), var(--surface1));
        border-radius: 0.5rem;
        overflow: hidden;
        padding: 1rem;
        margin: 2rem 0;
    }
    .options {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }
    .bars-container {
        height: 230px;
        display: flex;
        align-items: flex-end;
        margin: auto;
        position: relative;
    }
    .bar {
        flex: 2 1 auto;
        margin: 1px;
        transition: 0.2s ease;
    }
    .sort-close-window {
        width: 1.7rem;
        height: 1.7rem;
        padding: 0 !important;
        border-radius: 50%;
        line-height: 0;
        font-size: 1.5rem;
    }
</style>
