<script>
    import Navbar from "./components/Navbar.svelte";
    import SortingSidePanel from "./components/sorting/SidePanel.svelte";
    import SortingDashboard from "./components/sorting/Dashboard.svelte";
    import UserInputFeedback from "./components/user-input-feedback.svelte";

    import { ActiveVisualizer } from "./stores/active-visualizer";
    import { Router, Route } from "svelte-routing";
</script>

<Navbar />
<div id="main-parts-container">
    <!-- svelte-ignore a11y-unknown-role -->
    <aside role="Tools Panel" id="tools-panel">
        <nav>
            {#if $ActiveVisualizer == "sorting"}
                <SortingSidePanel />
            {:else if $ActiveVisualizer == "searching"}
                <button color="primary">Search now</button>
            {:else if $ActiveVisualizer == "searching"}
                <button color="primary">Find the path</button>
            {:else}
                <h3>Tutorial</h3>
            {/if}
        </nav>
        <!-- svelte-ignore a11y-unknown-role -->
        <!-- svelte-ignore a11y-invalid-attribute -->
        <!-- svelte-ignore a11y-missing-content -->
        <a href="#" role="Close Panel" id="close-panel" title="Close panel" />
    </aside>
    <main id="main">
        <a href="#tools-panel" id="open-panel" role="button">OPEN PANEL</a>
        <Router>
            <Route path="sorting"><SortingDashboard /></Route>
        </Router>
    </main>
</div>
<UserInputFeedback />

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
        margin: 2rem 1rem;
        display: none;
        position: fixed;
        right: 1rem;
        bottom: 0.5rem;
        z-index: 2;
    }
    #open-panel:hover {
        text-decoration: none;
    }
    #main-parts-container {
        display: grid;
        grid: [stack] 1fr / min-content [stack] 1fr;
        overflow: hidden;
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
            display: inline-block;
            margin: 1rem;
        }
    }
    @media (max-width: 500px) {
        #open-panel {
            margin: 1rem 0rem;
        }
    }
    aside,
    main {
        height: 100%;
    }
    main {
        padding: 1.5rem 1rem;
        z-index: 1;
        max-width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100%;
        scroll-behavior: smooth;
        position: relative;
    }
    #close-panel {
        position: fixed;
        will-change: display;
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
        z-index: 2;
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
        background-color: inherit;
    }
</style>
