<script>
    import { onMount, onDestroy } from "svelte";
    import { ActiveVisualizer } from "../../stores/active-visualizer";
    import { Sorting } from "../../stores/Sorting";
    import { AnimationObserver } from "../../stores/animations-observer";
    import SortingWindows from "./Window.svelte";
    import { fade } from "svelte/transition";
    import { SpeedTracker } from '../../stores/speed-tracker';
    import { DataTable as dt } from '../../stores/data-table';
    import { backdrop } from '../../stores/backdrop';

    backdrop.registerClickEvent('close-data-table', () => tableIsshown = false);

    let isRanked = false;
    let tableIsshown = false;

    $: {
        if(tableIsshown) {
            backdrop.show();
            dt.show();
        }
        else {
            dt.hide();
            backdrop.hide();
        }
    }

    $: rankBySpeed_disabled = ($AnimationObserver.length != $Sorting.windows.length) || $Sorting.windows.length == 0;
    $: if($AnimationObserver.length == 0) isRanked = false;

    onMount(() => {
        ActiveVisualizer.set("sorting");
        setTimeout(() => rankBySpeed_disabled = true, 10);
    });
    onDestroy(() => {
        dt.hide();
        backdrop.hide();
    });

    function rankBySpeed() {
        isRanked = true;
        const rankedVersion = getRankedWindowsBySpeed();
        Sorting.set(rankedVersion);
    }

    function generateTable() {
        const rankedVersion = getRankedWindowsBySpeed();
        const table = rankedVersion.windows.
            map(each => ({ name: each.algo.name, timer: each.resultSpeed.raw }));
        
        dt.setData({title: "Sort Timer Results", table: table})
        backdrop.setKey('close-data-table');
        tableIsshown = !tableIsshown;
    }

    function getRankedWindowsBySpeed() {
        const sortingCopy = {...$Sorting};
        sortingCopy.windows.forEach(each => each.resultSpeed = $SpeedTracker[each.algo.name])
        sortingCopy.array.sort((a,b) => (sortingCopy.ascending ? a-b : b-a));
        sortingCopy.windows.sort((w1, w2) => w1.resultSpeed.total - w2.resultSpeed.total);
        return sortingCopy;
    }
</script>

<main transition:fade={{ duration: 100 }}>
    <div class="header">
        <h2>Sorting Dashboard</h2>
        <div>
            <button 
                title={ rankBySpeed_disabled 
                    ? 'You can use this after sorting is completed.'
                    : 'Rank the algorithms base on their result speed.' }
                on:click={rankBySpeed} 
                disabled={rankBySpeed_disabled}> 
                Rank by Speed 
            </button>
            <button disabled={rankBySpeed_disabled} on:click={generateTable}>
                { tableIsshown ? 'Close Table':'View Table' }
            </button>
        </div>
    </div>

    {#each $Sorting.windows as window (window)}
        <SortingWindows {window} timer={window.resultSpeed.raw} />
    {:else}
        <h1 style="text-align: center; margin-top: 7rem;"
            in:fade={{ duration: 500 }} >
            Add Window !
        </h1>
    {/each}
    
</main>

<style>
    main {
        padding: 1rem;
        position: relative;
    }
    .header h2 {
        font-weight: 500;
    }
    .header, .header > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .header {
        margin-bottom: 2rem;
        justify-content: space-between;
    }   
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
        .header {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
