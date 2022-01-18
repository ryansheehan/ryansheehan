<script lang="ts">
  import { emailModal } from '$lib/store/modal';
  import { fade } from 'svelte/transition';
  import Modal from './modal.svelte';
  import CopyClipboard from '$lib/components/copy-clipboard.svelte';
  import CenterCard from './center-card.svelte';

  export let email: string;

  let copied = false;
  const copyEmail = () => {
    copied = true;
    return email;
  }
</script>

<Modal modal={emailModal}>  
  <CenterCard width="300px" height="300px">
    <div class="copy-container">
      <div style="height: var(--line-height-md)">
        {#if copied}
          <span class="copy-notification text-lg" transition:fade>Copied!</span>
        {/if}
      </div>
      <CopyClipboard class="copy color-blue glow--hover {copied ? 'glow bright' : ''}" width="3rem" getText={copyEmail}/>
    </div>
    <span>Contact me at <a class="color-blue glow" href="mailto:{email}">{email}</a></span>
  </CenterCard>
</Modal>

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

