<script>
    import { onMount, onDestroy } from "svelte";
    import { ActiveVisualizer } from "../../stores/active-visualizer";
    import { Sorting } from "../../stores/Sorting";
    import { AnimationObserver } from "../../stores/animations-observer";
    import SortingWindows from "./Window.svelte";
    import { fade } from "svelte/transition";

    onMount(() => {
        ActiveVisualizer.set("sorting");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

    function rankBySpeed() {
        const rankedVersion = Sorting.getRankedWindowsBySpeed();
        Sorting.set(rankedVersion);
    }

    function toggleRank() {
        // previousState.set({...$Sorting});

        if(isRanked) rankBySpeed();
        // else Sorting.set($previousState);
    }

    let isRanked;

    $: rankBySpeed_disabled = $AnimationObserver.length != $Sorting.windows.length;

</script>

<main transition:fade={{ duration: 100 }}>
    <div class="header">
        <h2>Sorting Dashboard</h2>
        <div title={ rankBySpeed_disabled 
                     ? 'You can use this after sorting is completed.'
                     : 'Rank the algorithms base on their result speed.' }>
            <label for="sort-by-speed">Rank by Speed</label>
            <input 
                type="checkbox" 
                role="switch" 
                id="sort-by-speed" 
                bind:checked={isRanked}
                on:change={toggleRank}
                disabled={rankBySpeed_disabled}>
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
