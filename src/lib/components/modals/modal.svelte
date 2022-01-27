<script lang="ts">
  import {onMount, onDestroy} from 'svelte'
  import { fade } from 'svelte/transition';
  import Portal from 'svelte-portal/src/Portal.svelte';
  import type { Modal } from '$lib/store/modal';
  
  export let modal: Modal;
  let bodyElement: HTMLElement | undefined = undefined;
  let contentWrapper: HTMLElement | undefined = undefined;
  
  const {disableScroll, enableScroll} = (() => {
    let overflowState: string;

    return {
      disableScroll: () => {
        if (bodyElement && $modal) {
          overflowState = bodyElement.style.overflow;
          bodyElement.style.overflow = 'hidden';
        }
      },
      enableScroll: () => {
        if (bodyElement && !$modal) {
          bodyElement.style.overflow = overflowState;
          overflowState = undefined;
        }
      }
    }
  })();

  onMount(() => bodyElement = document?.body);
  
  const unsubscribe = modal.subscribe(isOpen => {    
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  onDestroy(() => {    
    enableScroll();
    unsubscribe();
  });
</script>

<Portal target="#modal">
  <div class="backdrop" on:click={modal.close} transition:fade={{duration: 150}}/>
  <div class="content-wrapper" bind:this={contentWrapper}>
    <slot></slot>
  </div>
</Portal>


<style lang="postcss">
  .backdrop, .content-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .content-wrapper {
    pointer-events: none;
  }

  .backdrop {
    background-color: hsl(0deg 0% 0% / 0.5);
  }
</style>