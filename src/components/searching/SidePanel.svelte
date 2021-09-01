<script>
    import { onMount } from 'svelte';

    import { fillTracks } from "../../modules/slider";

    onMount(() => {
        fillTracks();
    });
</script>

<!-- search for integer -->
<div class="not-btn" title="Input an interger to search">
    <label for="search-value">Enter an Integer</label>
    <input 
        type="number" 
        placeholder="0" 
        id="search-value" 
        style="width: 10ch; text-align: center;">
</div>
<!-- Search! -->
<button class="btns" color="primary"> Search! </button>

<!-- Generate new array -->
<button class="btns" color="primary"> Generate New Array! </button>

<!-- Change size -->
<div class="not-btn" title="Change array size">
    <label for="array-size">Array size</label>
    <input 
        type="range" 
        role="slider"
        color="accent"
        min="10"
        max="100"
        step="1"
        id="array-size">
</div>

<!-- Change speed -->
<div class="not-btn" title="Change searching speed.">
    <label for="search-speed">Search speed</label>
    <input 
        type="range" 
        role="slider"
        color="primary"
        min="1"
        max="10"
        step="0.1"
        id="search-speed">
</div>

<!-- Stop! -->
<button class="btns" color="accent"> Stop </button>

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