<script lang="ts">
  import Email from '$lib/icons/email.svelte';  
  import LinkedIn from '$lib/icons/linkedin.svelte';
  import Github from '$lib/icons/github.svelte';  
  import Phone from '$lib/icons/phone.svelte';
  import { emailModal } from '$lib/store/modal';
  import { phone } from '$lib/resume/contact';

  let className: string | undefined = undefined;
  export {className as class};
</script>

<div class="socials-container {className}">  
  <a class="phone social color-blue" href="tel:{phone}"><Phone/></a>
  <span class="social color-blue glow--hover" on:click={() => emailModal.open()}><Email/></span>
  <a class="social color-blue glow--hover" href="https://www.linkedin.com/in/sheehanr/"><LinkedIn/></a>
  <a class="social color-blue glow--hover" href="https://github.com/ryansheehan/"><Github/></a>
</div>

<style lang="postcss">
  .socials-container {
    margin-left: auto;
    display: flex;
    flex-flow: row-reverse nowrap;
    align-items: center;
    justify-content: center;
    gap: 16px;         

    @media print {
      display: none;
    }

    @media screen and (--tablet-and-larger) {
      gap: 4px;
    }
  }

  .social {    
    width: 2rem;    

    @media screen and  (--laptop-and-larger) {
      transition: 0.3s;      
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }      
    }

    @media screen and (--tablet-and-larger) {
      &.phone {
        display: none;
      }
    }
  }

</style>