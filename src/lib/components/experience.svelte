<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import type { Experience } from '$lib/resume';

  export let experience: Experience[];  
</script>

<Section header="Experience">
  <div class="experience-list-container">    
    {#each experience as {company, periods} (company)}
      <div class="experience">
        <h3 class="company text-xl italic" style="grid-area: company">{company}</h3>
        <h4 class="company-time text-sm" style="grid-area: company-time">{periods[periods.length-1].start} - {periods[0].end ?? 'present'}</h4>        
        <div class="periods" style="grid-area: period">
          {#each periods as {start, end, title, achievements} (`${start}-${end}`)}  
            <div class="period">
              <h4 class="title text-lg bold" style="grid-area: title">{title}</h4>
              {#if periods.length > 1}
                <h5 class="time text-sm" style="grid-area: time">{start} - {end ?? 'present'}</h5>
              {/if}
              <ul class="achievements" style="grid-area: achievements">
                {#each achievements as achievement, index (index)}
                  <li>{achievement}</li>
                {/each}
              </ul>
            </div>        
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Section>

<style lang="postcss">
  .achievements {
    padding-top: 0.25rem;
  }

  .experience-list-container {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  .experience {
    display: grid;
    grid-template-columns: auto 1fr max-content;
    grid-template-areas:
    "company company company-time"
    "period period period";
    align-items: baseline;
  }

  .period {    
    padding-bottom: 1rem;
    display: grid;
    grid-template-columns: auto 1fr max-content;
    grid-template-areas:
    "title title title"
    "time time time"
    "achievements achievements achievements";

    @media screen and (--tablet-and-larger) {
      padding-left: 2ch;
    }
  }

  ul {
    padding-left: 2ch;   
  }
</style>