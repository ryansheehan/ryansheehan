<script lang="ts" context="module">
  export interface ClipboardModalProps {
    message: string;
    href: string;
    clipboardText: string;
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition';
  import CopyClipboard from '$lib/components/copy-clipboard.svelte';
  import CenterCard from './center-card.svelte';
  import {modal} from '$lib/store/modal';

  export let message: string;
  export let href: string;
  export let clipboardText: string;

  let copied = false;
  const copy = () => {
    copied = true;
    return clipboardText;
  }
</script>

<CenterCard width="300px" height="300px" onClose={modal.close}>
  <div class="copy-container">
    <div style="height: var(--line-height-md)">
      {#if copied}
        <span class="copy-notification text-lg" transition:fade>Copied!</span>
      {/if}
    </div>
    <CopyClipboard class="copy color-blue glow--hover {copied ? 'glow bright' : ''}" width="3rem" getText={copy}/>
  </div>
  <span>Contact me at <a class="color-blue glow" {href}>{message}</a></span>
</CenterCard>

<style lang="postcss">
  .copy-container {
    padding-bottom: 8px;
    @media screen and  (--laptop-and-larger) {
      & :global(.copy) {
        transition: 0.3s;
        opacity: 0.7;      
      }
      & :global(.copy:hover), & :global(.copy.bright) {
        opacity: 1;
      }
    }
  }

  a:hover {
    text-decoration: underline;
  }
</style>