<script lang="ts">
  import { fade } from 'svelte/transition'
  import { flip } from 'svelte/animate';
  import SectionHeader from '$lib/components/section-header.svelte';



  enum SkillType {
    Language,
    Framework,
    Other,
    Tool,
  }

  interface ISkill {
    name: string;
    type: SkillType;
    rank: number;
    link?: string;
  }

  let filterLanguage = false;
  let filterFramework = false;
  let filterOther = false;
  let filterTool = false;
  let filteredSkills: ISkill[] = [];
  let anyFilter: boolean;

  const sortSkills = (a:ISkill, b:ISkill) => b.rank - a.rank;

  const skills: ISkill[] = [
    { name: 'agile', type: SkillType.Other, rank: 4, link: 'https://en.wikipedia.org/wiki/Agile_Otherware_development' },
    { name: 'angular', type: SkillType.Framework, rank: 5, link: 'https://angular.io/' },    
    { name: 'aws', type: SkillType.Tool, rank: 2, link: 'https://aws.amazon.com/'},
    { name: 'c#', type: SkillType.Language, rank: 5, link: 'https://docs.microOther.com/en-us/dotnet/csharp/'},
    { name: 'c++', type: SkillType.Language, rank: 3, link: 'https://www.cplusplus.com/'},
    { name: 'css', type: SkillType.Language, rank: 4, link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'},
    { name: 'deno', type: SkillType.Framework, rank: 1, link: 'https://deno.land/'},
    { name: 'docker-compose', type: SkillType.Tool, rank: 5, link: 'https://docs.docker.com/compose/'},
    { name: 'docker', type: SkillType.Tool, rank: 5, link: 'https://www.docker.com/'},
    { name: 'git', type: SkillType.Tool, rank: 3, link: 'https://git-scm.com/'},
    { name: 'github', type: SkillType.Tool, rank: 3, link: 'https://github.com/'},
    { name: 'html', type: SkillType.Language, rank: 4, link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'javascript', type: SkillType.Language, rank: 4, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'jira', type: SkillType.Tool, rank: 3, link: 'https://www.atlassian.com/Otherware/jira'},
    { name: 'kubernetes', type: SkillType.Tool, rank: 1, link: 'https://kubernetes.io/'},
    { name: 'ngrx', type: SkillType.Framework, rank: 4, link: 'https://ngrx.io/' },
    { name: 'node', type: SkillType.Framework, rank: 3, link: 'https://nodejs.org/en/' },
    { name: 'python', type: SkillType.Language, rank: 1, link: 'https://www.python.org/' },
    { name: 'react', type: SkillType.Framework, rank: 3, link: 'https://reactjs.org/' },
    { name: 'real-time', type: SkillType.Other, rank: 2, link: 'https://www.smu.edu/guildhall'},
    { name: 'redux', type: SkillType.Framework, rank: 4, link: 'https://redux.js.org/'},
    { name: 'shape up', type: SkillType.Other, rank: 2, link: 'https://basecamp.com/shapeup'},
    { name: 'svelte', type: SkillType.Language, rank: 4, link: 'https://svelte.dev/'},
    { name: 'sveltekit', type: SkillType.Framework, rank: 3, link: 'https://kit.svelte.dev/'},
    { name: 'typescript', type: SkillType.Language, rank: 5, link: 'https://www.typescriptlang.org/' },
    { name: 'vscode', type: SkillType.Tool, rank: 4, link: 'https://code.visualstudio.com/'},
  ].sort(sortSkills);

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
  }

</script>

<SectionHeader>
  <svelte:fragment>Skills</svelte:fragment>
  <div slot="options" class="skill-filter-container">
    <label 
      class="skill-filter glow" 
      class:color-purple={filterLanguage}   
      class:selected={filterLanguage}   
      for="filter-language">Languages</label>
    <input class="visually-hidden" type="checkbox" id="filter-language" bind:checked={filterLanguage}>
    <label 
      class="skill-filter"
      class:color-green={filterFramework}
      class:selected={filterFramework}
      for="filter-framework">Frameworks</label>
    <input class="visually-hidden" type="checkbox" id="filter-framework" bind:checked={filterFramework}>
    <label 
      class="skill-filter"
      class:color-red={filterOther}
      class:selected={filterOther}
      for="filter-other">Other</label>
    <input class="visually-hidden" type="checkbox" id="filter-other" bind:checked={filterOther}>
    <label 
      class="skill-filter"
      class:color-yellow={filterTool}
      class:selected={filterTool}
      for="filter-tool">Tools</label>
    <input class="visually-hidden" type="checkbox" id="filter-tool" bind:checked={filterTool}>
  </div>
</SectionHeader>
<div class="skills-container">
  {#each filteredSkills as {name, type, link} (name)}
    <a href="{link}" 
      transition:fade={{duration: 300}}     
      animate:flip={{duration: 300}}
      class="glow" 
      class:color-purple={type === SkillType.Language && filterLanguage}
      class:color-green={type === SkillType.Framework && filterFramework}
      class:color-red={type === SkillType.Other && filterOther}
      class:color-yellow={type === SkillType.Tool && filterTool}
    >{name}</a>
  {/each}
</div>

<style lang="postcss">
  .selected {
    opacity: 1;
    text-decoration: underline;
  }

  .skill-filter {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);    
    opacity: 0.8;
    transition: 0.3s;
    
    @media (--tablet-and-larger) {
      font-size: var(--font-size-md);
      line-height: var(--line-height-md);         
    }

    @media (--laptop-and-larger) {      
      &:hover {
        opacity: 1;
        text-decoration: underline;
      }
    }
  }

  .skill-filter-container {    
    display: grid;    
    grid-template-columns: repeat(4, max-content);
    gap: 8px;
    align-items: center;
    text-align: center;
    font-size: var(--font-size-xs);
    line-height: var(--line-height-xs);
  }  

  label {
    @media (--tablet-and-larger) {
      cursor: pointer;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  div.skills-container {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 8px;
  }

  a {
    padding: 0 4px;
    border-radius: 8px;
    /* border: 1px solid;     */

    &:after {
      content: ',';
    }

    &:last-of-type:after {
      content: '';
    }
  }
</style>