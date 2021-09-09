<script>

</script>
<main>
    <header>
        <h1 class="title"> EEs Visualizer <span class="animate-text-gradient"> 2.0 </span> </h1>
        <h2 class="sub-title"> An Interactive Visualization Tool. </h2>
        <!-- <h1 class="sub-title"> Input some data, visualize, and analyze base on the results. </h1> -->
    </header>

    <section id="landing-page-animation">
        <div class="floor"></div>
    </section>

    <article>
        <h1 center> What is this ? </h1>
        <p center>
            EEs Visualizer is a tool for visualizing Fundamental Algorithms in Sorting, Searching, and Path Finding. This involves comparison between different algorithms and visulization of how each of them works. You can compare the algorithms' speed or how one is better than others. There are cool animations for visualizing algorithms. You can customize each of the visualizers' settings and inputs according to your preferences. Input some data, visualize how it works, and analyze base on the results.
        </p>
        <p center>
            <a href="#tutorials"> Learn more in Tutorials Section. </a>
        </p>
    </article>

    <br>
    <article>
        <h1 class="title"> Tutorials </h1>
    </article>
</main>

<style>

    #landing-page-animation {
        position: relative;
        height: 20rem;
        perspective: 17rem;
        perspective-origin: 50% 1rem;
        overflow: hidden;
        top: -6rem;
        z-index: -1;
    }
    .floor {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        background-image: repeating-radial-gradient(var(--surface3), var(--surface1) 80%);
        background-size: 5rem 5rem;
        transform: rotateX(80deg);
        animation: rotateScene 25s infinite linear;
        box-shadow: inset 0 0 50px 50px var(--surface1);
    }

    @keyframes rotateScene {
        from { background-position-y: bottom; }
        to { background-position-y: top; }
    }
    

    main {
        padding: 1rem;
    }
    header {
        margin-bottom: 2rem;
    }
    .title{
        font-size: 2rem;
        margin: .5rem 0;
        text-align: center;
    }
    .sub-title {
        color: var(--text2);
        text-align: center;
    }
    article, section {
        margin: 1rem 0;
    }
    article a {
        color: dodgerblue;
    }
    article h1 {
        margin: 1rem 0;
    }
    *[center] {
        text-align: center;
    }
</style>