<script>
    import Navbar from "./components/Navbar.svelte";
    import SortingSidePanel from "./components/sorting/SidePanel.svelte";
</script>

<Navbar />
<div id="main-parts-container">
    <!-- svelte-ignore a11y-unknown-role -->
    <aside role="Tools Panel" id="tools-panel">
        <nav>
            <SortingSidePanel />
        </nav>
        <!-- svelte-ignore a11y-unknown-role -->
        <!-- svelte-ignore a11y-invalid-attribute -->
        <!-- svelte-ignore a11y-missing-content -->
        <a href="#" role="Close Panel" id="close-panel" title="Close panel" />
    </aside>
    <main>
        <a href="#tools-panel" role="button" id="open-panel">OPEN PANEL</a>
    </main>
</div>

<style>
    :global(body) {
        display: grid;
        grid-template-rows: auto 1fr;
    }
    :global(:root) {
        --panel-translateX: 0;
        --panel-width: 300px;
    }
    #open-panel {
        display: none;
    }
    #main-parts-container {
        display: grid;
        grid: [stack] 1fr / min-content [stack] 1fr;
    }
    @media (max-width: 900px) {
        aside,
        main {
            grid-area: stack;
        }
        :global(:root) {
            --panel-translateX: -100%;
        }
        #close-panel {
            display: block;
        }
        #open-panel {
            display: inline;
        }
    }
    aside,
    main {
        height: 100%;
    }
    main {
        padding: 1rem;
    }
    #close-panel {
        position: fixed;
        will-change: visibility;
        width: calc(100vw - var(--panel-width));
        height: 100%;
        transform: translateX(var(--panel-width));
        top: 0;
        bottom: 0;
    }
    aside {
        width: var(--panel-width);
        background-color: var(--surface2);
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
        will-change: transform;
        transform: translateX(var(--panel-translateX));
        transition: 200ms ease;
    }
    aside #close-panel {
        display: none;
    }
    aside:target #close-panel {
        display: block;
    }
    aside:target {
        --panel-translateX: 0;
    }

    nav {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 1ch;
    }
</style>
