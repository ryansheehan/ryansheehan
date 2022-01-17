<script lang="ts">
  export let width = 'auto';
  export let height = 'auto';
  export let gap = '0px';

  const style = `
    --width:${width};
    --height:${height};
    --gap:${gap};
  `;
</script>

<div on:click|stopPropagation {style}><slot/></div>

<style lang="postcss">
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