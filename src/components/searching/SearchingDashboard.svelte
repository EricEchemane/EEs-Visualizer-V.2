<script>
    import { onMount, onDestroy } from 'svelte';

    import { ActiveVisualizer } from '../../stores/active-visualizer';
    import { Searching } from '../../stores/searching';

    import SearchingWindow from './SearchingWindows.svelte';

    onMount(() => {
        ActiveVisualizer.set("searching");
    });
    onDestroy(() => {
        ActiveVisualizer.set("");
    });

</script>

<main>
    <div class="header">
        <h2> Searching </h2>
    </div>

    {#each $Searching.windows as window (window)}
        <SearchingWindow {window} />
    {/each}
</main>

<style>
    main {
        padding: 1rem;
    }
    .header h2 {
        font-weight: 400;
    }
    @media (max-width: 500px) {
        main {
            padding: 0;
        }
    }
</style>