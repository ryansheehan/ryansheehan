<script lang="ts">
  import Skills from '$lib/components/skills.svelte';
  import Summary from '$lib/components/summary.svelte';
</script>

<svelte:head>
  <title>Ryan Sheehan resume</title>
</svelte:head>

<div>
  <Summary/> 
  <Skills/>
</div>

<style lang="postcss">
  div {
    /* height: 2000px;     */
    display: flex;
    flex-flow: column nowrap;
    gap: 32px;
  }
</style>
