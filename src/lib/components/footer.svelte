<script lang="ts">
  import Socials from '$lib/components/socials.svelte';
</script>

<div>
  <Socials class="socials"/>
  <p>Copyright &copy; 2022 Ryan Sheehan</p>
</div>

<style lang="postcss">
  div :global(.socials) {
    @media screen and (--tablet-and-larger) {
      display: none;
    }
  }
</style>
