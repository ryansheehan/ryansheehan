<script lang="ts">
  import {onDestroy} from 'svelte';
  import { fade } from 'svelte/transition';
  import CloseIcon from '$lib/icons/close.svelte';

  export let width = 'auto';
  export let height = 'auto';
  export let gap = '0px';

  type Handler = () => void;

  export let onClose: undefined | Handler = undefined;

  const style = `
    --width:${width};
    --height:${height};
    --gap:${gap};
  `;

  onDestroy(() => console.log('center-card onDestroy'));
</script>

<div {style} transition:fade={{duration: 150}}>
  {#if onClose}
    <button on:click={onClose} class="color-orange glow--hover"><CloseIcon width="1.5rem" height="1.5rem"/></button>
  {/if}
  <slot/>
</div>

<style lang="postcss">
  button {
    position: absolute;
    top: 24px;
    right: 24px;    
    background-color: transparent;    
    padding: 0;
    border: none;

    @media screen and (--laptop-and-larger) {
      opacity: 0.7;
      transition: opacity 0.3s;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }

  div {
    width: var(--width);
    height: var(--height);

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: var(--gap);

    padding: 2rem;
    border-radius: 2rem;
    background-color: hsl(var(--hsl-gray-600));
    color: var(--text-light-medium);

    pointer-events: auto;
  }
</style>