<script lang="ts">
  import Education from '$lib/components/education.svelte';
  import Experience from '$lib/components/experience.svelte';
  import Skills from '$lib/components/skills.svelte';
  import Summary from '$lib/components/summary.svelte';

  import { resume } from '$lib/resume';
  const { summary, skills, experience, education } = resume;

  const host = 'https://ryansheehan.github.io'
  const ogImageUrl = `${host}/images/do-something-great-1200x627.jpg`
</script>

<svelte:head>
  <title>Ryan Sheehan Resume</title>
  <meta property="og:site_name" content="Ryan Sheehan" />
  <meta property="og:title" content="Software Engineer &amp; Development Manager"/>
  <meta property="og:description" content="Ryan Sheehan is a Software Engineer and Development Manager. Come check out what I'm up to..."/>
  <meta property="og:url" content="{host}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="{ogImageUrl}"/>
  <meta property="og:image:secure_url" content="{ogImageUrl}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content = "627"/>
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
