<script lang="ts">
    import type {HTMLAttributes} from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLDivElement> {
    }

    let {...divAttributes} = $props();

</script>

<div class:marker={true} {...divAttributes}>

</div>

<style>
    .marker {
        --color: var(--clr-text);
        --size: var(--size-6);
        --border-size: var(--size-0);

        padding: 0;
        margin: 0;

        border-radius: 1e5px;
        border: var(--border-size) solid var(--color);

        height: var(--size);
        aspect-ratio: 1 / 1;

        position: relative;
    }

    .marker::before {        
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