<script lang="ts">  
  import '../style/global.css';
  import Layout from '$lib/components/layout.svelte';
  
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Signika+Negative:wght@400;700&display=swap" rel="stylesheet">   
</svelte:head>


<Layout><slot/></Layout>


<style lang="postcss" global>
  .glow-bright {
    --glow-hsl-a: 0.7;
  }

  .glow-dim {
    --glow-hsl-a: 0.15;
  }

  .glow, .glow--hover:hover, .glow--hover:active {
    filter: --var(--glow);
  }

  .glow--hover {  
    transition-property: color, filter;
    transition-duration: 0.5s; 
  }

  body {
    background-color: hsl(var(--hsl-gray-500)); 
    align-items: center;
  }

  #svelte {
    flex: 1;        
    display: flex;        
    flex-direction: column nowrap;
    width: 100%;
    max-width: 800px;        
    background-color: hsl(var(--hsl-gray-900)); 
    color: var(--text-light-medium);
    padding: 16px 32px; 
    transition: 0.3s;
    
    @media (--laptop-and-larger) {
      margin: 16px 0;
      border-radius: 16px;
    }
  }
</style>
