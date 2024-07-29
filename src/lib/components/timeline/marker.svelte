<script lang="ts" context="module">
    export type ActiveCallback = (active: boolean) => void;
    export type RegistrationFn = (callback: ActiveCallback) => (evt: MouseEvent) => void;
    export function createActiveContext() {
        const createId = (function*() {
            let _id = 1000;
            while (true) {
                yield _id++;
            }
        })();

        const registrar = new Map<number, ActiveCallback>();

        const register = (callback: ActiveCallback) =>{
            const _id = createId.next().value;
            registrar.set(_id, callback);
            const _onclick = (evt: MouseEvent) => {
                registrar.forEach((setActive, id) =>{
                    setActive(_id === id);
                })
            }
            return _onclick;
        }

        return register;
    }
</script>
<script lang="ts">
    import {type Snippet, onMount} from 'svelte';

    interface Props {           
        active?: boolean;  
        yearStart: string;
        yearEnd: string;         
        register?: RegistrationFn;
        children?: Snippet<[]>;    
    }

    let {active=false, yearStart, yearEnd, register, children}: Props = $props();
        
    let onclick = $state<(evt: MouseEvent) => void>(() => {});
    const setActive = (value: boolean) => active = value;

    onMount(() => {
        if (register) {
            onclick = register(setActive);
        }
    });
    
</script>

<div class="marker-container">
    <div class="year">
        <span>{yearStart}</span>
        <span>-</span>
        <span>{yearEnd}</span>
    </div>
    <!-- <div class="year">{year}</div> -->
    <div class="line"></div>
    <button class="marker" data-active={active} {onclick}></button>
    <section class="description-container">
        {@render children?.()}
    </section>
</div>


<style>
    .description-container {
        grid-column: description;        
        padding-inline-start: var(--size-4);
        padding-block-end: var(--spacing-block-3);
    }

    .marker-container {
        display: grid;
        grid-template-columns: subgrid;
        position: relative;
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

    .line {
        position: absolute;
        top: var(--half-size);
        left: calc(var(--half-size) - var(--half-border-size));
        grid-column: marker;
        grid-row: 1;
        height: 100%;
        border-right: var(--color) solid var(--border-size);
    } 

    .year {
        grid-column: year;
        padding-block-start: calc(var(--half-size) - (var(--spacing-block-1) * 0.5));
        padding-inline-end: var(--size-relative-3);
        justify-self: end;
    }

    @media (--sm-n-below) {
        .year {
            /* transform-origin: bottom right;
            transform: rotate(-90deg); */

            /* transform: scaleX(-1); */
            transform: rotate(-180deg);
            writing-mode: vertical-lr;
            text-align: right;
            padding: 0;
            padding-bottom: calc(var(--size) + var(--size-3));
            margin-right: var(--size-000);
        }
    }

    .marker[data-active="true"]::before {        
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