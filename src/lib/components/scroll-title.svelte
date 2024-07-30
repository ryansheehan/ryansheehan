<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { onDestroy, onMount, tick } from 'svelte';

    import type {HTMLAttributes} from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLHeadingElement> {
        lede: string[];
        words: string[];
        delay?: number;
    }
    const {lede = $bindable([]), words = $bindable([]), delay = 3000, ...attrs}: Props = $props();

    let phrases = $derived(words.map((word, index) => [lede[index], word]));
    let activeIndex = $state(words.length - 1);    
    let intervalHandle = -1;
    
    onMount(() => {        
        intervalHandle = setInterval(() => activeIndex = (activeIndex + 1) % words.length, delay);
    })

    onDestroy(() => {
        clearTimeout(intervalHandle);
    });
</script>

{#snippet word({hidden, text})}
    <span class:hidden={hidden} aria-hidden={hidden} class="phrase">{text}</span>    
{/snippet}

<h1 class:banner={true} class:glass-effect={true} {...attrs}>
    <span class="cycler">
        <!-- update words -->
        {#each phrases as phrase, index (index)}
            {#if index === activeIndex}
                <span class="phrase" transition:fade={{duration: 500}}>
                    <span class="lede">{phrase[0]}</span>
                    <span class="word">{phrase[1]}</span>
                </span>
            {/if}
        {/each}

        <!-- spacer -->
        {#each phrases as phrase, index (index)}
            <span class="phrase hidden" aria-hidden="true">
                <span class="lede">{phrase[0]}</span>
                <span class="word">{phrase[1]}</span>
            </span>            
        {/each}
    </span>
</h1>

<style>
    .glass-effect {
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.005);
        border-radius: var(--radius-3);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2.5px);
        -webkit-backdrop-filter: blur(2.5px);
        border: var(--border-size-1) solid rgba(255, 255, 255, 0.1);
    }

    .cycler {
        display: inline-grid;
        grid-template-columns: fit-content;
        grid-template-rows: auto;
        /* justify-content: center; */
        /* text-align: center;  */
        align-items: center;       
    }

    .hidden {
        visibility: hidden;
    }

    .phrase {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;            
        /* font-style: italic;     */   
        display: inline-grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--size-relative-2);
        align-items: baseline;
    }

    .lede {
        justify-self: end;
        color: var(--clr-primary);
    }

    .word {
        justify-self: start;
        color: var(--clr-accent);
    }

    .banner {
        padding-inline: var(--size-relative-3);        
    }

    h1 {
        font-size: var(--font-size-fluid-2);        
    }
</style>