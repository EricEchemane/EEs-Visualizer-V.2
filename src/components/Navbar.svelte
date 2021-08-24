<script>
    import { Link, Router } from "svelte-routing";
</script>

<nav>
    <div id="desktop-nav">
        <Router>
            <Link to="/">
                <h3>
                    EEs Visualizer <span class="animate-text-gradient">2.0</span
                    >
                </h3>
            </Link>
        </Router>
        <Router>
            <div class="links" id="desktop-links">
                <Link to="sorting">Sorting</Link>
                <Link to="searching">Searching</Link>
                <Link to="path-finding">Path Finding</Link>
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
                <Link to="sorting">Sorting</Link>
                <Link to="searching">Searching</Link>
                <Link to="path-finding">Path Finding</Link>
            </div>
        </Router>
    </div>
</nav>

<style>
    nav {
        background-color: var(--surface3);
        padding: 0.5rem;
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
