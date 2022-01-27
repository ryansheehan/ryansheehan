<script lang="ts">
  import {onMount, onDestroy, SvelteComponent} from 'svelte'
  import { fade } from 'svelte/transition';
  import Portal from 'svelte-portal/src/Portal.svelte';
  import { modal } from '$lib/store/modal';

  let bodyElement: HTMLElement | undefined = undefined;  

  $: opened = $modal.open;
  
  const {disableScroll, enableScroll} = (() => {
    let overflowState: string;

    return {
      disableScroll: () => {
        if (bodyElement && opened) {
          overflowState = bodyElement.style.overflow;
          bodyElement.style.overflow = 'hidden';
        }
      },
      enableScroll: () => {
        if (bodyElement && !opened) {
          bodyElement.style.overflow = overflowState;
          overflowState = undefined;
        }
      }
    }
  })();

  onMount(() => bodyElement = document?.body);
  
  const unsubscribe = modal.subscribe(({open}) => {    
    if (open) {
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
  <div class="content-wrapper">    
    <svelte:component this={$modal.component} {...$modal.data} />
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