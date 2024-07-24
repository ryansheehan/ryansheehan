<script lang="ts">
    import "../style.css";
    import GithubIcon from "../lib/icons/github.svelte";
    import LinkedInIcon from '../lib/icons/linkedin.svelte';
    import {activeRoute} from '../lib/actions/active-route.svelte';

    let {children} = $props();
</script>

<main>    
    <header class="content-grid">
        <div class="primary-header__layout">
            <a href="/" class="home-link">Ryan Sheehan</a>
            <nav class="main-nav" aria-label="site navigation">
                <ul>
                    <li><a href="/" use:activeRoute>Home</a></li>
                    <li><a href="/about" use:activeRoute>About</a></li>
                </ul>
            </nav>
            <nav aria-label="social media links">
                <ul>
                    <li>
                        <a href="https://github.com/ryansheehan/">
                            <GithubIcon class="social-icon"/>
                            <span class="sr-only">Github</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/sheehanr/">
                            <LinkedInIcon class="social-icon"/>
                            <span class="sr-only">LinkedIn</span>
                        </a>
                    </li>
                </ul>                
            </nav>
        </div>
    </header>
    {@render children()}
</main>

<style>
    main {                
        --gradient-gray: linear-gradient(in lch, var(--grayscale-950) 15%, color-mix(in lch, var(--grayscale-950) 80%, var(--grayscale-900)), var(--grayscale-900));

        min-height: 100svh;
        /* background: var(--gradient-gray);         */
        position: relative;        
    }

    header {
        align-items: baseline;

        padding-block-start: var(--spacing-block-1);
        margin-bottom: var(--spacing-block-1);    
    }

    :global(.social-icon) {
        fill:var(--clr-text);     
        height:var(--spacing-block-1);   
    }

    .primary-header__layout {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }    

    a {
        text-decoration: none;
        text-transform: uppercase;        
        color: var(--clr-text);        
    }

    .main-nav li:hover, .main-nav li:has(.active) {
        border-block-end: var(--size-0) solid var(--clr-text);        
    }
    
    .home-link {            
        font-size: var(--font-size-3);
        line-height: var(--line-height-3);
        font-weight: var(--font-weight-6);
        letter-spacing: var(--font-letterspacing-3);
    }

    nav ul {
        display: flex;
        gap: var(--size-3);

        li {
            list-style-type: none;   
            max-height: var(--spacing-block-1);  
        }
    }


</style>

