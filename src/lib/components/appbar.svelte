<script lang="ts">
  import Socials from '$lib/components/socials.svelte';
  import type { Contact } from '$lib/resume';

  export let contact: Contact;
  
</script>

<div class="header-content">
  <img src="https://www.gravatar.com/avatar/559b2e9fe5620de0994a0de5180cd6eb" alt="Ryan Sheehan" />
  <a class="color-blue--hover glow--hover" href="/"><h1 class="text-3xl">Ryan Sheehan</h1></a>  
  <Socials class="socials" {contact}/>
</div>
<hr/>

<style lang="postcss">
  .header-content {    
    display: flex;
    flex-flow: row wrap;
    align-items: center;    

    & :global(.socials) {
      padding-top: 6px; 
      display: none;     
    }      
  }

  @media (--tablet-and-larger) {

    .header-content {
      margin-top: 0;
    }
    .header-content :global(.socials) {
      display: flex;      
    }
  }

  h1 {    
    padding-left: 16px;
    white-space: nowrap;    
  } 

  img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    filter: grayscale(100%);
    transition: 1s;

    &:hover {
      filter: none;
    }
  }

  a {
    flex: 1;
  }

  hr {
    margin-top: 8px;
  }
</style>