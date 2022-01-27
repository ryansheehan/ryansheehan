<script lang="ts">  
  import '../style/global.css';
  import Layout from '$lib/components/layout.svelte';
  import { modal } from '$lib/store/modal';
  import Modal from '$lib/components/modals/modal.svelte';

  import AppBar from '$lib/components/appbar.svelte';
  import Footer from '$lib/components/footer.svelte'; 
  
  import { resume } from '$lib/resume';
  const {contact} = resume;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">  
  <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Signika+Negative:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>


<Layout>
  <AppBar slot="header" {contact}/>  
  <slot slot="content"/>
  <Footer slot="footer" {contact}/>
</Layout>

{#if $modal.open}
  <Modal />
{/if}

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
