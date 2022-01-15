<script lang="ts">
  import GlowToggle from '$lib/components/glow-toggle.svelte';
  import { Color } from '$lib/constants';

  export let filterLanguage: boolean;
  export let filterFramework: boolean;
  export let filterOther: boolean;
  export let filterTool: boolean;
</script>

<div class="text-sm">
  <GlowToggle label="Languages" color={Color.Purple} bind:checked={filterLanguage}/>
  <GlowToggle label="Frameworks" color={Color.Green} bind:checked={filterFramework}/>
  <GlowToggle label="Other" color={Color.Red} bind:checked={filterOther}/>
  <GlowToggle label="Tools" color={Color.Yellow} bind:checked={filterTool}/>  
</div>

<style lang="postcss">
  div {
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;
    align-items: center;
    text-align: center;
  }
</style>