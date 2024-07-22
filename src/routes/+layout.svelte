<script lang="ts">
    import "../style.css";

    let {children} = $props();
</script>

<main>    
    {@render children()}
</main>

<style>
    main {        
        min-height: 100svh;
    }
</style>
