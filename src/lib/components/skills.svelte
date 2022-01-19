<script lang="ts">
  import { fade } from 'svelte/transition'
  import { flip } from 'svelte/animate';
  import Section from '$lib/components/section.svelte';
  import SkillFilter from '$lib/components/skill-filter.svelte';
  import {ISkill, SkillType} from '$lib/resume';  

  export let skills: ISkill[];

  let filterLanguage = false;
  let filterFramework = false;
  let filterOther = false;
  let filterTool = false;
  let filteredSkills: ISkill[] = [];
  let anyFilter: boolean;

  let container: HTMLElement;

  $: {
    anyFilter = filterLanguage || filterFramework || filterOther || filterTool;
    filteredSkills = [...skills.filter(skill => {
      if (anyFilter) {
        if (skill.type === SkillType.Language) {
          return filterLanguage;
        } else if (skill.type === SkillType.Framework) {
          return filterFramework;
        } else if (skill.type === SkillType.Other) {
          return filterOther;
        } else if (skill.type === SkillType.Tool) {
          return filterTool;
        }
      }
      return true;
    })];

    if (container?.offsetHeight) {
      container.style.minHeight = `${container.offsetHeight}px`;
    }
  }

  function isSelected(type: SkillType) {
    return ((type === SkillType.Language && filterLanguage) ||
      (type === SkillType.Framework && filterFramework) ||
      (type === SkillType.Other && filterOther) ||
      (type === SkillType.Tool && filterTool));
  }  
</script>

<Section header="Skills">  
  <svelte:fragment slot="options">
    <SkillFilter bind:filterLanguage bind:filterFramework bind:filterOther bind:filterTool />
  </svelte:fragment>

  <div class="skills-container" bind:this={container}>
    {#each filteredSkills as {name, type, link} (name)}
      <a href="{link}" target="_blank" rel="noopener"
        transition:fade={{duration: 300}}     
        animate:flip={{duration: 300}}
        class="glow skill"
        class:selected={isSelected(type)} 
        class:color-purple={type === SkillType.Language && filterLanguage}
        class:color-green={type === SkillType.Framework && filterFramework}
        class:color-red={type === SkillType.Other && filterOther}
        class:color-yellow={type === SkillType.Tool && filterTool}
      >{name}</a>
    {/each}
  </div>
</Section>

<style lang="postcss">
  
  div.skills-container {   
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: flex-start;
    column-gap: 8px;
  }  

  a.skill {
    padding: 0 4px;
    border-radius: 8px;    
    /* border: 1px solid;     */
    @media screen and (--laptop-and-larger) {
      transition: opacity 0.3s;
      opacity: 0.7;

      &:hover, &.selected {
        opacity: 1;        
      }
    }

    &:after {
      content: ',';
    }

    &:last-of-type:after {
      content: '';
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
