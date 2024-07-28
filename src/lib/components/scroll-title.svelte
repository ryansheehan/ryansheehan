<script lang="ts">
    import { fly } from 'svelte/transition';
    import { onDestroy, onMount, tick } from 'svelte';

    import type {HTMLAttributes} from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLHeadingElement> {
        lede: string;
        words: string[];
        delay?: number;
    }
    const {lede, words, delay = 3000, ...attrs}: Props = $props();

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
    <span class:hidden={hidden} aria-hidden={hidden} class="word">{text}</span>    
{/snippet}

<h1 class:banner={true} class:glass-effect={true} {...attrs}>
    <span>{lede}</span>
    <span class="cycler">
        <!-- update words -->
        {#each words as text, index (index)}
            {#if index === activeIndex}                
                <span class="word"
                    data-highlight={text}
                    in:fly={{duration: 500, y: 50}} 
                    out:fly={{duration: 500, y: -50}} 
                >{text}</span>
            {/if}
        {/each}

        <!-- spacer -->
        {#each words as text, index (index)}
            {@render word({text, hidden: true})}
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
        grid-template-columns: min-content;
        grid-template-rows: auto;
        /* justify-content: center; */
        text-align: center;        
    }

    .hidden {
        visibility: hidden;
    }

    .word {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;            
        font-style: italic;    
    }

    .banner {
        padding-inline: var(--size-relative-3);        
    }

    h1 {
        font-size: var(--font-size-fluid-2);        
    }
</style>