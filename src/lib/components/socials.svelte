<script lang="ts">
  import Email from '$lib/icons/email.svelte';  
  import LinkedIn from '$lib/icons/linkedin.svelte';
  import Github from '$lib/icons/github.svelte';

  let className: string | undefined = undefined;
  export {className as class};
</script>

<div class={className}>
  <a class="color-blue glow--hover" href="mailto:rsheehan@gmail.com"><Email/></a>
  <a class="color-blue glow--hover" href="https://www.linkedin.com/in/sheehanr/"><LinkedIn/></a>
  <a class="color-blue glow--hover" href="https://github.com/ryansheehan/"><Github/></a>
</div>

<style lang="postcss">
  div {
    margin-left: auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 4px;    
  }

  a {    
    width: 1.5rem;
    @media (--tablet-and-larger) {
      width: 2rem;
    }
    
    @media (--laptop-and-larger) {
      transition: 0.3s;      
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>