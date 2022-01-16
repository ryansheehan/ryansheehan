<script lang="ts">
  import Education from '$lib/components/education.svelte';
  import Experience from '$lib/components/experience.svelte';
  import Skills from '$lib/components/skills.svelte';
  import Summary from '$lib/components/summary.svelte';
</script>

<svelte:head>
  <title>Ryan Sheehan resume</title>
</svelte:head>

<div>
  <Summary/> 
  <Skills/>
  <Experience/>
  <Education/>
</div>

<style lang="postcss">
  div {
    /* height: 2000px;     */
    display: flex;
    flex-flow: column nowrap;
    gap: 32px;
  }
</style>
