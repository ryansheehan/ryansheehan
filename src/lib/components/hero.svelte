<script lang="ts">
    import Constellation from './constellation/constellation.svelte';
    // import WordCycle from './word-cycle.svelte';
    import ScrollTitle from './scroll-title.svelte';
    
    let constellation = $state<Constellation>();
</script>

<section class="full-width">
    <Constellation bind:this={constellation} />
    <div class="header-text-container isolate no-pointer-events no-select">        
        <ScrollTitle class="cta-title" lede="I build" words={['software', 'teams', 'experiences']} />
        <button class="reset-button has-pointer-events" onclick={() => constellation?.reset()}>Reset</button>
    </div>
</section>

<style>
    :global(.cta-title [data-highlight="experiences"]) {
        color: var(--clr-primary);
        /* font-weight: bold; */
    }

    section {        
        position: relative;
        height: 600px;        
        width: 100%;    
        border-block: var(--border-size-1) solid color-mix(in lch, var(--grayscale-900) 30%, rgba(255, 255, 255, 0));
    }

    @media (max-height: 500px) {
        section {
            height: 250px;
        }
    }
    
    .no-pointer-events {
        pointer-events: none;
    }

    .has-pointer-events {
        pointer-events: auto;
    }

    .isolate {
        isolation: isolate;
    }

    .no-select {
        user-select: none;
    }

    .header-text-container {
        position: relative;
        display: grid;
        place-items: center;      
    }

    button {
        width: fit-content;
        height: fit-content;
        border-radius: var(--radius-round);
        padding-inline: var(--size-relative-3);
        border: var(--border-size-2) solid var(--clr-text);
        background-color: transparent;
    }

    .reset-button {
        position: absolute;
        top: var(--spacing-block-1); right: 0;
    }

    .header-text-container:hover .reset-button {
        background-color: var(--clr-background);
        cursor: pointer;
    }
</style>