<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onDestroy, onMount, } from 'svelte';

    import type {HTMLAttributes} from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLHeadingElement> {
        lede: string[];
        words: string[];
        delay?: number;
    }
    const {lede = $bindable([]), words = $bindable([]), delay = 3000, ...attrs}: Props = $props();

    let phrases = $derived(words.map((word, index) => [lede[index], word]));
    let longestWord = $derived(phrases.reduce((longest, [lede, word]) => Math.max(longest, lede.length, word.length), 0));
    let activeIndex = $state(0);    
    let intervalHandle = -1;
    
    onMount(() => {        
        // activeIndex = 0;
        intervalHandle = setInterval(() => activeIndex = (activeIndex + 1) % words.length, delay);
    })

    onDestroy(() => {
        clearTimeout(intervalHandle);
    });
</script>

<h1 class:banner={true} class:glass-effect={true} {...attrs} style="width:calc(2 * {longestWord}ch + 2ch);">    
    {#each phrases as phrase, index (index)}
        {#if index === activeIndex}
            <span class="lede" transition:fade={{delay: 500}}>{phrase[0]}</span>
            <span class="word" transition:fade={{delay: 500}}>{phrase[1]}</span>
        {/if}
    {/each}    
</h1>

<style>
    .banner {   
        font-size: var(--font-size-fluid-2); 

        position: relative;     
        display: grid;
        grid-template-columns: [lede-start] 1fr [lede-end word-start] 1fr [word-end];
        column-gap: var(--size-relative-2);        
   
        padding-inline: var(--size-relative-3);  
        padding-block: var(--size-relative-1);      

        & > * {
            grid-row: 1 / 2;
        }

        border-radius: var(--radius-3);
        border: var(--border-size-1) solid rgba(255, 255, 255, 0.1);
    }

    .lede {        
        grid-column: lede;
        justify-self: end;
        color: var(--clr-primary);        
    }

    .word {        
        grid-column: word;
        justify-self: start;
        color: var(--clr-accent);
    }
</style>