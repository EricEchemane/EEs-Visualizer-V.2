<script>
    import { UserInputFeedback } from '../../stores/user-input-feedback';
    import { fillTracks } from "../../modules/slider";
    import { onMount } from 'svelte';

    onMount(() => {
        fillTracks();
    });
</script>

<!-- choose algrotihm -->
<div class="not-btn">
    <select name="algorithm" id="algorithm-select" class="fullWidth">
        <option hidden>Choose Algorithm</option>
        <option disabled>  </option>
        <option value="3"> A* Algorithm </option>
        <option disabled>  </option>
        <option value="3"> Dijkstra's Algorithm </option>
        <option disabled>  </option>
        <option value="1"> Greedy Algorithm </option>
        <option disabled>  </option>
        <option value="1"> Breadth Search First </option>
        <option disabled>  </option>
        <option value="2"> Depth Search First </option>
        <option disabled>  </option>
    </select>
</div>

<!-- maze and patterns -->
<div class="not-btn">
    <select name="maze/wall" id="maze/wall" class="fullWidth">
        <option hidden>Generate Obstacles</option>
        <option disabled>  </option>
        <option value="3"> Recursive Division </option>
        <option disabled>  </option>
        <option value="3"> Vertical Skew </option>
        <option disabled>  </option>
        <option value="3"> Horizontal Skew </option>
        <option disabled>  </option>
        <option value="3"> Random Walls </option>
        <option disabled>  </option>
        <option value="3"> Random Weighted Nodes </option>
        <option disabled>  </option>
    </select>
</div>

<!-- Find the Path! -->
<button color="accent" class="btns"> 
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" style="width: 100%; height: 100%; display: block;"> 
        Find the path! 
    </a>
</button>

<div class="two-btns">
    <!-- Clear All -->
    <button color="primary"> Clear All </button>
    <!-- Clear path -->
    <button color="primary"> Clear Path </button>
</div>

<div class="two-btns">    
    <button color="accent"> Pause </button>
    <button color="accent"> Stop </button>
</div>

<!-- Speed -->
<div class="not-btn" title="Change animation speed">
    <label for="path-finding-speed"> Speed </label>
    <input 
        id="path-finding-speed"
        color="primary"
        min="1"
        max="10"
        step="0.1"
        role="slider"
        type="range">
</div>

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
    button > a {
        color: var(--surface1);
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
    .fullWidth {
        width: 100% !important;
    }
    .two-btns {
        padding: 0.7rem 0.5rem;
        display: grid;
        grid-template-columns: calc(50% - .5rem) calc(50% - .5rem);
        gap: 1rem;
    }
    .btns {
        margin: .7rem .5rem;
    }
 </style>