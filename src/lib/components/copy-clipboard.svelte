<script lang="ts">
  import CopyClipboardIcon from '$lib/icons/copy-clipboard.svelte';

  export let getText: () => string = () => '';
  export let width = '1em';
  let className = '';
  export {className as class};

  function copyToClipboard() {
    navigator.clipboard.writeText(getText());
  }
</script>

<div class="{className}" on:click={copyToClipboard} style="--width:{width}"><CopyClipboardIcon/></div>

<style lang="postcss">
  div {
    display: inline-block;    
    width: var(--width);

    @media screen and (--laptop-and-larger) {
      cursor: pointer;
    }
  }
</style>