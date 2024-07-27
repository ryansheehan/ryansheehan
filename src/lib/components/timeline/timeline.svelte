<script lang="ts">
    import {type Snippet, onMount} from 'svelte'
    import type {HTMLAttributes} from 'svelte/elements';

    let timelineContainer: HTMLDivElement;

    interface Props extends HTMLAttributes<HTMLDivElement> {        
        children: Snippet<[]>;
    }

    let markerCount = $state(0);
    $effect(() => {
        markerCount = timelineContainer.children.length - 1;        
    })    

    const {children, class:className, ...divAttr}: Props = $props();
</script>

<div class="timeline-container {className}" bind:this={timelineContainer} {...divAttr} style="--marker-count:{markerCount}">
    <div class="line"></div>
    {@render children()}
</div>

<style>
    .timeline-container {
        --color: var(--timeline-color, var(--clr-text));
        --size: var(--timeline-size, var(--size-6));
        --border-size: var(--timeline-border-size, var(--size-0));
        --marker-height: var(--timeline-marker-height, auto);

        --half-size: calc(var(--size) * 0.5);
        --half-border-size: calc(var(--border-size) * 0.5);
        
        position: relative;
        display: grid;
        grid-template-columns: [description-start] max-content [description-end marker-start] auto [marker-end year-start] min-content [year-end];
        grid-auto-rows: var(--marker-height);
    }

    :global(.timeline-container > .marker-container) {
        grid-column: 1 / -1;
    }

    .line {        
        position: absolute;
        grid-column: marker;
        grid-row: 1 / -1;
        height: calc((var(--marker-count) - 1) * var(--marker-height));
        width: calc(100% - var(--half-size) + var(--half-border-size));
        border-right: var(--color) solid var(--border-size);        
        margin-top: var(--half-size);
    }
</style>