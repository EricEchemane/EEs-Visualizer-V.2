<script>
    import { onMount, onDestroy } from 'svelte';

    import { ActiveVisualizer } from '../../stores/active-visualizer';
    import { Searching } from '../../stores/searching';
    import { AnimationObserver } from './AnimationObserver';
    import { SearchResult } from './searching-animations-logic';
    import SearchingWindow from './SearchingWindows.svelte';
    import { DataTable as dt } from '../../stores/data-table';
    import { backdrop } from '../../stores/backdrop';

    onMount(() => {
        ActiveVisualizer.set("searching");
        backdrop.registerClickEvent('close-search-result-table', () => {
            backdrop.hide();
            dt.hide();
            setTimeout(dt.clear, 100);
        })
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

    const generateTable = () => {
        const headers = ["No:", "Name", "Steps until found"];
        const table = [];
        let n = 1;
        for(const key in $SearchResult) {
            const stepsUntilFound = $SearchResult[key].status == 'not-found' 
                ? 'Not Found' : $SearchResult[key].steps + " steps" ;

            const row = [n, key, stepsUntilFound];
            table.push(row);
            n++;
        }
        dt.setData({
            title: 'Search Results',
            headers: headers,
            table: table
        })

        backdrop.show();
        backdrop.setKey('close-search-result-table');
        dt.show();
    }

    $: viewTableDisabled = $AnimationObserver.length != $Searching.windows.length || $AnimationObserver.length == 0;
</script>

<main>
    <div class="header">
        <h2> Searching Dashboard </h2>
        <button on:click={generateTable} disabled={viewTableDisabled} > View Table </button>
    </div>

    {#each $Searching.windows as window (window)}
        <SearchingWindow {window} />
    {/each}
</main>

<style>
    main {
        padding: 1rem;
    }
    .header{
        display: flex;
        justify-content: space-between;
    }
    .header h2 {
        font-weight: 400;
    }
    .header > button {
        width: fit-content;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
        .header {
            flex-direction: column;
            justify-content: flex-start;
            gap: 1rem;
        }
    }
</style>