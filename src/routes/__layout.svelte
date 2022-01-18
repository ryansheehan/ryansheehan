<script lang="ts">  
  import '../style/global.css';
  import Layout from '$lib/components/layout.svelte';
  import Modals from '$lib/components/modals/modals.svelte';

  import AppBar from '$lib/components/appbar.svelte';
  import Footer from '$lib/components/footer.svelte';  
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Signika+Negative:wght@400;700&display=swap" rel="stylesheet">   
</svelte:head>


<Layout>
  <AppBar slot="header"/>  
  <slot slot="content"/>
  <Footer slot="footer" />
</Layout>
<Modals/>

<style lang="postcss" global>
  

  body {
    background-color: hsl(var(--hsl-gray-500)); 
    align-items: center;
  }

  #svelte {
    flex: 1;        
    display: flex;        
    flex-flow: column nowrap;
    width: 100%;
    max-width: 800px;        
    background-color: hsl(var(--hsl-gray-900)); 
    color: var(--text-light-medium);
    padding: 16px 32px; 
    transition: 0.3s;

    @media screen and  (--laptop-and-larger) {
      margin: 16px 0;
      border-radius: 16px;
    }
  }
</style>
