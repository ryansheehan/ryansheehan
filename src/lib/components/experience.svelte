<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import {experience} from '$lib/resume/experience';
</script>

<Section header="Experience">
  <div class="experience-list-container">
    {#each experience as {company, title, start, end, achievements} (`${start}-${end}`)}
      <div class="experience">
        <h3 class="title" style="grid-area: title">{title}</h3>
        <h4 class="company" style="grid-area: company">{company}</h4>
        <div class="time" style="grid-area: time">{start} - {end ?? 'present'}</div>
        <ul class="achievements" style="grid-area: achievements">
          {#each achievements as achievement, index (index)}
            <li>{achievement}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</Section>

<style lang="postcss">
  .experience-list-container {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  .title {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-xl);
  }

  .company, .time {
    font-size: var(--font-size-md);
    line-height: var(--line-height-md);
  }

  .experience {
    display: grid;
    grid-template-columns: auto 1fr max-content;
    grid-template-areas: 
    "title title title"
    "company company company"
    "time time time"
    "achievements achievements achievements";

    @media screen and (--tablet-and-larger) {
      grid-template-areas:
      "title title title"
      "company company time"
      "achievements achievements achievements";
    }
  }

  ul {
    padding-left: 1.5rem;
    @media screen and (--tablet-and-larger) {
      padding-left: 2rem;
    }
  }
</style>