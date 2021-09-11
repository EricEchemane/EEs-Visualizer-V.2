<script>
    import { onMount } from 'svelte';
    import { ActiveVisualizer } from '../../stores/active-visualizer';

    onMount(() => {
        ActiveVisualizer.set("");
    });
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

    <article id="about-this-app">
        <h1> About this App </h1>
        <p>
            EEs Visualizer is a tool for visualizing Fundamental Algorithms in Sorting, Searching, and Path Finding. This involves comparison between different algorithms and visulization of how each of them works. You can compare the algorithms' speed or how one is better than others. There are cool animations for visualizing algorithms. You can customize each of the visualizers' settings and inputs according to your preferences. Input some data, visualize how it works, and analyze base on the results.
        </p>
    </article>

    <br>

    <article id="sorting-tutorial">
        <h1> Sorting Visualizer Tutorial </h1>
        <p>
            If you want you can go ahead and click on sorting tab. The inputs and controls are pretty straight forward and fun at the same time. Else, you can watch the <a href="#sorting-video"> video below. </a>
        </p>
        <h3> What is Sorting Visualizer ? </h3>
        <p>
            Sorting visualizer allows you to compare sorting algorithms by their speed. Watch how each algorithm perform and how they manage to sort the input array. A table is generated after all algorithms are finished.
        </p>
        <video controls id="sorting-video" muted>
            <source src="./assets/videos/sorting.mp4" type="video/mp4">
                <track kind="captions" >
        </video>
    </article>
</main>

<style>

    #landing-page-animation {
        position: absolute;
        width: calc(100% + 1rem);
        height: 22rem;
        perspective: 17rem;
        perspective-origin: 50% 1rem;
        overflow: hidden;
        top: -5rem;
        left: -1rem;
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
        box-shadow: inset 0 0 50px 85px var(--surface1);
    }

    @keyframes rotateScene {
        from { background-position-y: bottom; }
        to { background-position-y: top; }
    }
    

    header {
        margin-bottom: 2rem;
        padding: 1rem;
    }
    .title{
        font-size: 3rem;
        margin: .5rem 0;
    }
    .sub-title {
        color: var(--text2);
    }
    article, section {
        padding: 1rem;
    }
    a {
        color: dodgerblue;
    }
    article h1 {
        margin: 1rem 0 .5rem 0;
    }
    article h3 {
        margin: 1rem 0 .5rem 0;
        color: var(--text2);
    }
    article video {
        width: 100%;
        display: block;
        margin: 2rem auto;
    }
    article:target {
        animation: notice 4s ease;
    }
    @keyframes notice {
        from { background-color: var(--surface3); }
        to { background-color: inherit; }
    }
    @keyframes noticeText {
        to { color: var(--brand); }
    }
    @media (max-width: 900px) {
        header * {
            text-align: center;
        }
        article:target {
            animation: none;
        }
        article:target > h1 {
            animation: noticeText 4s ease;
        }
    }
    @media (max-width: 400px) {
        .title {
            font-size: 2rem;
        }
        article, section {
            padding: 0;
        }
    }
</style>