<script lang="ts">
    import type {Snippet} from 'svelte';

    interface Props {
        active?: boolean;
        year: string;    
        children?: Snippet<[]>;    
    }

    let {active = false, year, children}: Props = $props();

</script>

<div class="marker-container">
    <section class="description-container">
        {@render children?.()}
    </section>
    <div class="marker" data-active={active}></div>
    <div class="year">{year}</div>
</div>


<style>
    .description-container {
        grid-column: description;
        padding-block-start: var(--size);
        padding-inline-end: var(--size-2);
    }

    .marker-container {
        display: grid;
        grid-template-columns: subgrid;
    }

    .marker {        
        grid-column: marker;

        padding: 0;
        margin: 0;
        background-color: var(--clr-background);

        border-radius: 1e5px;
        border: var(--border-size) solid var(--color);

        height: var(--size);
        aspect-ratio: 1 / 1;

        position: relative;
    }

    .year {
        grid-column: year;
        padding-block-start: calc(var(--half-size) - (var(--spacing-block-1) * 0.5));
        padding-inline-start: var(--size-relative-3);
    }

    [data-active="true"]::before {        
        --ping-offset: calc(var(--border-size) * -1);

        content: '';
        padding: 0;
        margin: 0;

        position: absolute;
        top: var(--ping-offset); bottom: var(--ping-offset); right: var(--ping-offset); left: var(--ping-offset);
        display: block;        
        
        /* height: 100%;
        width: 100%; */

        /* z-index: 1; */

        border-radius: 1e5px;
        border: var(--border-size) solid var(--color);
        
        /* scale: 0.5; */
        transform: scale(0.0);
        transform-origin: center;    
        
        animation: grow 1.5s infinite;
    }

    @keyframes grow {
        100% {
            transform: scale(1);
        }
    }
</style>