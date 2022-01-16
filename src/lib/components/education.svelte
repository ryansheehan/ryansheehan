<script lang="ts">
  import Section from '$lib/components/section.svelte';

  interface Education {
    school: string;
    study: string;
    degree: string;
    year: string;
  }

  const education: Education[] = [
    {
      school: 'Southern Methodist University',
      study: 'Digital Game Development',
      degree: 'Professional Certification',
      year: '2008',
    },
    {
      school: 'Southern Illinois University Edwardsville',
      study: 'Computer Science',
      degree: 'Bachelor of Science',
      year: '2005',
    }
  ]
</script>

<Section header="Education">
  <ul>
  {#each education as {school, study, degree, year} (school+year)}
    <li>
      <div class="education">
        <div class="study text-lg" style="grid-area: study;">{study}</div>
        <div class="school text-sm" style="grid-area: school;">{school}</div>
        <div class="degree text-sm" style="grid-area: degree;">{degree}</div>
        <div class="year text-sm" style="grid-area: year;">{year}</div>
      </div>
    </li>  
  {/each}
  </ul>
</Section>

<style lang="postcss">
  ul {
    padding-left: 16px;
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
  }

  .education {
    display: grid;
    grid-template-columns: min-content max-content 1fr;
    column-gap: 1ch;
    grid-template-areas: 
    "study study study"
    "school school school"
    "year degree .";

    @media screen and (--tablet-and-larger) {
      grid-template-columns: min-content 1fr max-content;      
      grid-template-areas: 
      "study study degree"
      "year school school";
      /* justify-items: center; */

      & .school, & .year {
        align-self: flex-start;
      }

      & .study, & .degree {
        align-self: baseline;
      }

      & .year {
        justify-self: flex-end;
      }

      & .degree {
        justify-self: flex-start;
      }
    }
  }

  .year {
    &:before {
      content: '[';
    }

    &:after {
      content: ']';
    }
  }
</style>