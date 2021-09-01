<script>
    import { Searching } from '../../stores/searching';
    import { fade } from 'svelte/transition';

    export let window;

    $: nums = $Searching.array;
    $: barClass = `bar-search-${window.name}`;
</script>

<section in:fade={{ duration: 1000 }}>
    <div class="header">
        <h4> {window.name} </h4>
        <div style="flex: 1 1 auto"/>
        <input type="color" id="color" bind:value={window.color}>
    </div>

    <div class="bars-container">
        {#each nums as num, i (i)}
            <div class="bar {barClass}"
                 style="background-color: {window.color}; height: {num}px"/>
        {/each}
    </div>
</section>

<style>
    .header {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    section {
        background-image: linear-gradient(var(--surface2), var(--surface1));
        border-radius: 0.5rem;
        overflow: hidden;
        padding: 1rem;
        margin: 2rem 0;
    }
    .bars-container {
        height: 210px;
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
</style>