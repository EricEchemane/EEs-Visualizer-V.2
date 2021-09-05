<script>
    import { Searching } from '../../stores/searching';
    import { SearchResult } from './searching-animations-logic';

    export let window;

    $: nums = $Searching.array;
    $: barClass = `bar-search-${window.name}`;

    $: if(window.name == "Binary Search") {
        nums = [...nums].sort((a, b) => a-b);
    }

</script>

<section>
    <div class="header">
        <h4> {window.name} </h4>
        <p> { $SearchResult[window.name]?.status == 'not-found' ? 'Not Found':'' } </p>
        <p> { $SearchResult[window.name]?.status == 'found' 
            ? `Found at index ${$SearchResult[window.name]?.foundAtIndex} in ${$SearchResult[window.name]?.steps} steps.`
            :'' } </p>
    </div>

    <div class="bars-container">
        {#each nums as num, i (i)}
            <div class="bar {barClass} {
                $SearchResult[window.name]?.foundAtIndex == i ? 'index-found':''}"
                 style="background-color: {window.color}; height: {num}px"
                 data-index={num}/>
        {/each}
    </div>
</section>

<style>
    .index-found::after, .index-found::before {
        content: '';
        position: absolute;
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        left: 50%;
        transform: translateX(-50%) rotate(-45deg);
        top: -3.5rem;
        background-color: white;
        border-radius: 50% 50% 50% 0;
        z-index: 2;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, .1);
    }

    .index-found::before {
        content: attr(data-index);
        border-radius: 50%;
        transform: translateX(-50%);
        background-color: var(--surface1);
        z-index: 3;
        border: 2px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        padding: .25rem;
        color: white;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    section {
        background-image: linear-gradient(var(--surface2), var(--surface1));
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 2rem 0;
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
        position: relative;
    }
    @media (max-width: 400px) {
        .header {
            flex-direction: column;
            gap: .5rem;
        }
    }
</style>