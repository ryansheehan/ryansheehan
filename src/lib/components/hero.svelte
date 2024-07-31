<script lang="ts">
    import Constellation from './constellation/constellation.svelte';
    // import WordCycle from './word-cycle.svelte';
    import ScrollTitle from './scroll-title.svelte';
    
    interface Props {
        skipTarget?: HTMLElement | string;
    }
    const {skipTarget}: Props = $props();

    let constellation = $state<Constellation>();

    function scrollIntoView() {
        console.log('scrollIntoView', skipTarget);
        const target = typeof skipTarget === 'string' ? document.querySelector(skipTarget) : skipTarget;
        target?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
</script>

<section class="full-width">
    <Constellation bind:this={constellation} />
    <div class="header-text-container isolate no-pointer-events no-select">        
        <ScrollTitle class="cta-title" 
            delay={4000}
            lede={ ['directing', 'building', 'evolving']} 
            words={['software', 'engineers', 'business']} 
        />
        <button class="reset-button has-pointer-events" onclick={() => constellation?.reset()}>Reset</button>
        <button class="skip-button has-pointer-events" onclick={scrollIntoView}>Skip</button>
    </div>
</section>

<style>
    section {        
        position: relative;
        height: 600px;        
        width: 100%;    
        border-block: var(--section-border);

        background-color: var(--clr-background);
        color: var(--clr-text);
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
        color: var(--clr-text);
        &:hover {
            border-color: var(--clr-primary);
            color: var(--clr-primary);
        }
    }

    .reset-button {
        position: absolute;
        top: var(--spacing-block-1); right: 0;        
    }

    .skip-button {
        position: absolute;
        top: var(--spacing-block-1); left: 0;        
    }   

    .header-text-container:hover .reset-button {
        background-color: var(--clr-background);
        cursor: pointer;
    }
</style>