<script lang="ts">
    import Constellation from './constellation/constellation.svelte';
    // import WordCycle from './word-cycle.svelte';
    import ScrollTitle from './scroll-title.svelte';
    import {onMount} from 'svelte';
    import {slide} from 'svelte/transition';
    
    
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

    let sectionElement = $state<HTMLElement>();
    let hidden = $state(false);

    function mountInstructionHandlers() {
        sectionElement?.addEventListener('pointerdown', onpointerdown);
    }

    function unmountInstructionHandlers() {
        sectionElement?.removeEventListener('pointerdown', onpointerdown);
    }

    function reset() {
        constellation?.reset();
        // hidden = false;
        // mountInstructionHandlers();
    }

    function onpointerdown() {
        hidden = true;
        unmountInstructionHandlers();
    }

    onMount(() => {
        mountInstructionHandlers();
    });
</script>

<section class="full-width" bind:this={sectionElement}>
    <Constellation bind:this={constellation} />
    <div class="header-text-container isolate no-pointer-events no-select">        
        <ScrollTitle class="cta-title" 
            delay={4000}
            lede={ ['directing', 'building', 'evolving']} 
            words={['software', 'engineers', 'business']} 
        />
        <button class="reset-button glass-effect has-pointer-events" onclick={reset}>Reset</button>
        <button class="skip-button glass-effect has-pointer-events" onclick={scrollIntoView}>Skip</button>
        {#if !hidden}
            <div class="click-below glass-effect" transition:slide={{duration: 300, axis: 'y'}}>☝️ click above ☝️</div>
        {/if}
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

    /* @media(--xl-n-above) {
        section {
            height: 1000px;
        }
    } */
    
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
        /* background-color: transparent; */
        color: var(--clr-text);
        &:hover {
            border-color: var(--clr-accent);
            color: var(--clr-accent);
            cursor: pointer;
        }
    }

    .reset-button {
        position: absolute;
        top: var(--spacing-block-1); right: 0;        
    }

    .skip-button {
        position: absolute;
        top: var(--spacing-block-1); left: 0;     
        
        &:hover {
            border-color: var(--clr-primary);
            color: var(--clr-primary);
        }
    }   

    /* .header-text-container:hover .reset-button {
        background-color: var(--clr-background);
        cursor: pointer;
    } */

    .click-below {
        --border: var(--border-size-1) solid rgba(255, 255, 255, 0.1);

        display: none;
        position: absolute;
        bottom: -1px;
        left: auto;
        right: auto;
        /* background: var(--clr-background); */
        padding-block: var(--size-2);
        padding-inline: var(--size-relative-3);        
        border-left: (--border);
        border-right: (--border);
        border-top: (--border);
        border-radius: var(--radius-3) var(--radius-3) 0 0;
    }

    @media (--md-n-above) and (--landscape) {
        .click-below {
            display: block;
        }
    }
</style>