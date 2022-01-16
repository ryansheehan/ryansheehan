<script lang="ts">
  import AppBar from '$lib/components/appbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Socials from '$lib/components/socials.svelte';
</script>

<div class="socials-container">
  <div>
    <Socials/>
  </div>
</div>
<header><AppBar/></header>    
<main>
  <slot/>
</main>
<footer><Footer/></footer>

<style lang="postcss">
  .socials-container {
    position: fixed;
    display: grid;
    place-items: center;
    bottom: 0; 
    left: 0;  
    right: 0;             
    padding: 8px;
    background-color: hsl(var(--hsl-gray-900));
    z-index: 10;       

    @media screen and (--tablet-and-larger) {
      display: none;
    }
  }
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