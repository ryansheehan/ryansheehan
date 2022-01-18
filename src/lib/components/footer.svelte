<script lang="ts">
  import Socials from '$lib/components/socials.svelte';
</script>

<div class="footer">
  <Socials class="socials"/>
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
