<script lang="ts">
  import Socials from '$lib/components/socials.svelte';
  import type {Contact} from '$lib/resume';

  export let contact: Contact;
</script>

<div class="footer">
  <Socials {contact} />
  <p>Copyright &copy; 2022 Ryan Sheehan</p>
</div>

<style lang="postcss">
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
</style>
