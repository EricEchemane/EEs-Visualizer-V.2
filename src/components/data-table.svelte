<script>
    import { slide } from 'svelte/transition';
    import { DataTable } from '../stores/data-table';
</script>

<main transition:slide={{ duration: 150 }}>
    {#if $DataTable.data && $DataTable.data.title && $DataTable.data.table}
        <h4 class="title"> {$DataTable.data.title} </h4>
        <div class="table">
            <table>
                <tr>
                    <th>Place</th>
                    <th>Algorithm</th>
                    <th>Timer (min:sec:milli) </th>
                </tr>
                {#each $DataTable.data.table as {name, timer},i (i)}
                    <tr>
                        <td> {i+1} </td>
                        <td> {name} </td>
                        <td> {timer} </td>
                    </tr>
                {/each}
            </table>
        </div>
    {/if}
</main>

<style>
    main {
        width: minmax(400px,90vw);
        height: auto;
        border-radius: .25rem;
        background-color: var(--surface3);
        box-shadow: 0 4px 24px 8px rgba(0, 0, 0, .5);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        border: 1px solid var(--text3);
    }

    .table {
        padding: 1rem .5rem;
    }

    table, tr, th, td {
        border: none;
        border-collapse: collapse;
    }

    th, td {
        text-align: left;
        padding: .5rem 1rem;
    }
    .title {
        background-color: var(--surface4);
        padding: 1rem;
        text-align: center;
    }
    @media (max-width: 500px) {
        th, td {
            padding: .5rem;
        }
    }
</style>