<script>
    import { onMount, onDestroy } from "svelte";
    import { ActiveVisualizer } from "../../stores/active-visualizer";
    import { Sorting } from "../../stores/Sorting";
    import { AnimationObserver } from "../../stores/animations-observer";
    import SortingWindows from "./Window.svelte";
    import { fade } from "svelte/transition";
    import { SpeedTracker } from '../../stores/speed-tracker';

    let isRanked = false;

    $: rankBySpeed_disabled = $AnimationObserver.length != $Sorting.windows.length;
    $: if($AnimationObserver.length == 0) isRanked = false;

    onMount(() => {
        ActiveVisualizer.set("sorting");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

    function rankBySpeed() {
        isRanked = true;
        const rankedVersion = getRankedWindowsBySpeed();
        Sorting.set(rankedVersion);
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
        <div title={ rankBySpeed_disabled 
                     ? 'You can use this after sorting is completed.'
                     : 'Rank the algorithms base on their result speed.' }>
            <button on:click={rankBySpeed} disabled={rankBySpeed_disabled}> 
                Rank by Speed 
            </button>
        </div>
    </div>

    {#each $Sorting.windows as window (window)}
        <SortingWindows {window} timer={window.resultSpeed.raw} />
    {:else}
        <h1 style="text-align: center; margin: auto;"
            in:fade={{ duration: 500 }} >
            Add Window !
        </h1>
    {/each}
</main>

<style>
    main {
        padding: 1rem;
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
