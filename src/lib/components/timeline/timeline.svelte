<script lang="ts">
    import {type Snippet} from 'svelte'
    import type {HTMLAttributes} from 'svelte/elements';
    import Line from './line.svelte';

    interface Props extends HTMLAttributes<HTMLDivElement> {        
        children: Snippet<[]>;
    }

    const {children, class:className, ...divAttr}: Props = $props();

    
</script>

<div class="timeline-container {className}" {...divAttr}>    
    {@render children()}
    {#if children.length > 0}
        <Line/>
    {/if}
</div>

<style>
    .timeline-container {
        --color: var(--timeline-color, var(--clr-text));
        --size: var(--timeline-size, var(--size-6));
        --border-size: var(--timeline-border-size, var(--size-0));        

        --half-size: calc(var(--size) * 0.5);
        --half-border-size: calc(var(--border-size) * 0.5);
        
        position: relative;
        display: grid;
        grid-template-columns: [year-start] max-content [year-end marker-start] min-content [marker-end description-start] minmax(min-content, 1fr) [description-end];
        grid-auto-rows: var(--marker-height);
    }

    :global(.timeline-container > .marker-container) {
        grid-column: 1 / -1;
    }
</style>