<script lang="ts">
  import AppBar from '$lib/components/appbar.svelte';
  import Footer from '$lib/components/footer.svelte';
</script>

<header><AppBar/></header>    
<main>
  <slot/>
</main>
<footer><Footer/></footer>

<style lang="postcss">
  header {
    flex: none;
    display: fixed;
    width: 100%;
    top: 0;   
    margin-bottom: 16px;       
  }  

  main {
    flex: 1 1 auto;
  }

  footer {
    flex: none;
    text-align: center;
  }
</style>