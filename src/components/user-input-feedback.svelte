<script>
    import { UserInputFeedback } from "../stores/user-input-feedback";
    import { fade } from "svelte/transition";
</script>

{#if $UserInputFeedback.show}
    <h2 id="user-input-feedback"
        in:fade={{ duration: 100 }}
        out:fade={{ y: -100, duration: 500 }} >
        {$UserInputFeedback.content}
    </h2>
{/if}

<style>
    #user-input-feedback {
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 1rem;
        box-shadow: 0 0 24px 8px rgba(0, 0, 0, 0.3);
        border-radius: 0.25rem;
        background-color: var(--text1);
        color: var(--surface1);
        z-index: 10;
        font-weight: 500;
        width: fit-content;
    }
</style>
