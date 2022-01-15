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

  .color-blue, .color-blue--hover {
    --glow-hsl-deg: var(--color-deg-blue);
  }
  .color-blue, .color-blue--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .color-orange, .color-orange--hover {
    --glow-hsl-deg: var(--color-deg-orange);
  }
  .color-orange, .color-orange--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .color-green, .color-green--hover {
    --glow-hsl-deg: var(--color-deg-green);
  }
  .color-green, .color-green--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .color-purple, .color-purple--hover {
    --glow-hsl-deg: var(--color-deg-purple);
  }
  .color-purple, .color-purple--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .color-red, .color-red--hover {
    --glow-hsl-deg: var(--color-deg-red);
  }
  .color-red, .color-red--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .color-yellow, .color-yellow--hover {
    --glow-hsl-deg: var(--color-deg-yellow);
  }
  .color-yellow, .color-yellow--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .color-test, .color-test--hover {
    --glow-hsl-deg: var(--color-deg-test);
  }
  .color-test, .color-test--hover:hover {
    color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
    border-color: hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l));
  }

  .glow, .glow--hover:hover {
    filter: drop-shadow(0 0 4px hsl(var(--glow-hsl-deg) var(--glow-hsl-s) var(--glow-hsl-l) / var(--glow-hsl-a)));
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
