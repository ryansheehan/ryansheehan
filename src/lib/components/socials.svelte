<script lang="ts">
  import Email from '$lib/icons/email.svelte';  
  import LinkedIn from '$lib/icons/linkedin.svelte';
  import Github from '$lib/icons/github.svelte';  
  import Phone from '$lib/icons/phone.svelte';
  import { modal } from '$lib/store/modal';  
  import ClipboardModal, {ClipboardModalProps} from '$lib/components/modals/clipboard.modal.svelte'
  import type { Contact } from '$lib/resume';

  export let contact: Contact;
  const {phone, linkedIn, github, email} = contact;

  let className: string | undefined = undefined;
  export {className as class};

  const emailModalProps: ClipboardModalProps = {
    message: email,
    href: `mailto:${email}`,
    clipboardText: email,
  }

  const [_, areaCode, phone1, phone2] = phone.split('-');

  const phoneModalProps: ClipboardModalProps = {
    message: `(${areaCode}) ${phone1}-${phone2}`,
    href: `tel:${phone}`,
    clipboardText: phone,
  }
</script>

<div class="socials-container {className}">  
  <span class="phone social color-blue glow--hover" on:click={() => modal.open(ClipboardModal, phoneModalProps)}><Phone/></span>
  <span class="email social color-blue glow--hover" on:click={() => modal.open(ClipboardModal, emailModalProps)}><Email/></span>
  <a class="social color-blue glow--hover" href="https://www.linkedin.com/in/{linkedIn}/" target="_blank" rel="noopener"><LinkedIn/></a>
  <a class="social color-blue glow--hover" href="https://github.com/{github}/" target="_blank" rel="noopener"><Github/></a>
</div>

<style lang="postcss">
  @media screen and (--tablet-and-larger) {
    .email, .phone {
      cursor: pointer;
    }    
  }
  
  .socials-container {    
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

    /* @media screen and (--tablet-and-larger) {
      &.phone {
        display: none;
      }
    } */
  }

</style>
