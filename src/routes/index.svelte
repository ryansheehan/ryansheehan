<script lang="ts">
  import Education from '$lib/components/education.svelte';
  import Experience from '$lib/components/experience.svelte';
  import Skills from '$lib/components/skills.svelte';
  import Summary from '$lib/components/summary.svelte';

  import { resume } from '$lib/resume';
  const { summary, skills, experience, education } = resume;
</script>

<svelte:head>
  <title>Ryan Sheehan resume</title>
</svelte:head>

<div>
  <Summary {summary}/> 
  <Skills {skills}/>
  <Experience {experience}/>
  <Education {education}/>
</div>

<style lang="postcss">
  div {
    /* height: 2000px;     */
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
    padding-bottom: 2rem;
  }
</style>
