<script>
    import { Router, link } from "svelte-routing";
    import { ActiveVisualizer } from "../stores/active-visualizer";
</script>

<nav>
    <div id="desktop-nav">
        <Router>
            <a href="/" use:link>
                <h3>
                    EEs Visualizer <span class="animate-text-gradient">2.0</span
                    >
                </h3>
            </a>
        </Router>
        <Router>
            <div class="links" id="desktop-links">
                <a
                    use:link
                    href="sorting"
                    class:activeRoute={$ActiveVisualizer == "sorting"}
                    >Sorting</a
                >
                <a
                    use:link
                    href="searching"
                    class:activeRoute={$ActiveVisualizer == "searching"}
                    >Searching</a
                >
                <a
                    use:link
                    href="path-finding"
                    class:activeRoute={$ActiveVisualizer == "path-finding"}
                    >Path Finding</a
                >
            </div>
        </Router>
        <a href="https://github.com/ericechemane">
            <img
                src="https://avatars.githubusercontent.com/u/68469018?v=4"
                class="avatar"
                alt=""
            />
        </a>
    </div>
    <div id="mobile-nav">
        <Router>
            <div class="links">
                <a
                    use:link
                    href="sorting"
                    class:activeRoute={$ActiveVisualizer == "sorting"}
                    >Sorting</a
                >
                <a use:link href="searching">Searching</a>
                <a use:link href="path-finding">Path Finding</a>
            </div>
        </Router>
    </div>
</nav>

<style>
    nav {
        background-color: var(--surface3);
        padding: 1rem;
    }
    #desktop-nav {
        display: flex;
        place-content: center space-between;
        place-items: center;
    }
    .links {
        display: flex;
        place-content: center;
        align-items: center;
        gap: 1rem;
    }
    #mobile-nav {
        display: none;
    }
    @media (max-width: 700px) {
        #desktop-links {
            display: none;
        }
        #mobile-nav {
            display: block;
        }
        #mobile-nav .links {
            place-content: start;
        }
    }
</style>
