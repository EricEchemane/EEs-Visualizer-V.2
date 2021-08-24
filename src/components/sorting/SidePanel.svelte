<!-- svelte-ignore a11y-invalid-attribute -->
<a role="button" href="#" class="btns" color="accent">Start sorting!</a>
<button class="btns" color="primary">Generate new array</button>

<div title="Change array size" class="not-btn">
    <label for="array-size-slider"> Array size </label>
    <input
        type="range"
        role="slider"
        min="1"
        step="1"
        max="200"
        value="100"
        color="accent"
        id="array-size-slider"
    />
</div>
<div title="Change sorting speed" class="not-btn">
    <label for="sorting-speed-slider"> Speed </label>
    <input
        type="range"
        role="slider"
        min="1"
        step=".1"
        max="10"
        value="9"
        id="sorting-speed-slider"
    />
</div>
<div title="Change sorting order" class="not-btn">
    <label for="sort-order">Ascending</label>
    <input type="checkbox" role="switch" checked />
</div>

<style>
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
