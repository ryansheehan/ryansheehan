<script lang="ts">
  import Section from '$lib/components/section.svelte';
  import type {Education} from '$lib/resume';

  export let education: Education[];
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