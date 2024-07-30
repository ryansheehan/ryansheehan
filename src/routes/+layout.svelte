<script lang="ts">
    import "../style.css";
    import Socials from '$lib/components/socials.svelte';      

    let {children} = $props();

    const builtYear = 2024;
    const currentYear = new Date().getFullYear();
</script>

<svelte:head>
    <title>Ryan Sheehan - Software Engineering Manager | Proven Leader in Tech</title>
    <meta name="description" content="Software Engineering Manager (18+ yrs) with MBA seeks Director role. Experienced leader in tech, adept at driving innovation and business growth.">
    <link rel="canonical" href="https://ryan.sheehan.info">
    <meta name="robots" content="all">

    <meta property="og:title" content="Ryan Sheehan - Software Engineering Manager">
    <meta property="og:description" content="Software Engineering Manager (18+ yrs) with Executive MBA seeks Director role. Experienced in leading teams, delivering software solutions, and strategic business management.">
    <meta property="og:image" content="https://ryan.sheehan.info/images/ogimage-1200x630.png">
    <meta property="og:url" content="https://ryan.sheehan.info">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Ryan Sheehan">

    <meta property="og:profile:username" content="sheehanr">  
    <meta property="og:profile:url" content="https://www.linkedin.com/in/sheehanr/"> 
    <meta property="og:portfolio:url" content="https://github.com/ryansheehan"> 
    <meta property="og:article:author" content="Ryan Sheehan">
</svelte:head>

<header class="content-grid">
    <div class="primary-header__layout">
        <a href="/" class="home-link">Ryan Sheehan</a>
        <Socials/>
    </div>
</header>
<main>        
    {@render children()}
    <footer class="content-grid">
        <div class="footer__layout">
            <p>Contact: <a class="email-link" href="mailto:rsheehan@gmail.com">rsheehan@gmail.com</a></p>
            <p>&copy; {currentYear !== builtYear ? `${builtYear} - ${currentYear}` : `${currentYear}`} Ryan Sheehan <span>All rights reserved.</span></p>            
        </div>
    </footer>
</main>

<style>
    :global(body) {
        --section-border: var(--border-size-1) solid color-mix(in lch, var(--grayscale-900) 30%, rgba(255, 255, 255, 0));
    }

    main {                
        --gradient-gray: linear-gradient(in lch, var(--grayscale-950) 15%, color-mix(in lch, var(--grayscale-950) 80%, var(--grayscale-900)), var(--grayscale-900));        

        min-height: 100svh;
        /* background: var(--gradient-gray);         */
        position: relative;        
    }

    header {      
        z-index: 10000;  
        isolation: isolate;
        align-items: baseline;
        position: sticky;
        top: 0;
        background-color: var(--clr-background);

        padding-block: var(--spacing-block-1);
        /* margin-bottom: var(--spacing-block-1);     */
        border-bottom: var(--section-border);
    }

    .primary-header__layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }    

    a {
        text-decoration: none;        
        color: var(--clr-text);        
    }

    .email-link {
        color: var(--clr-primary);

        &:hover {
            text-decoration: underline;
        }
    }

    /* .main-nav li:hover, .main-nav li:has(.active) {
        border-block-end: var(--size-0) solid var(--clr-text);        
    } */
    
    .home-link {                    
        text-transform: uppercase;
        font-size: var(--font-size-3);
        line-height: var(--line-height-3);
        font-weight: var(--font-weight-6);
        letter-spacing: var(--font-letterspacing-3);                
    }

    footer {
        margin-block-start: var(--spacing-block-2);
        min-height: var(--spacing-block-3);        
        border-top: var(--section-border);
        
        display: grid;
        place-items: center;

        & p {
            font-size: var(--font-size-0);
            line-height: var(--line-height-0);
        }
    }

    .footer__layout {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        justify-items: center;
    }
</style>

