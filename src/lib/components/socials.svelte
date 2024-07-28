<script lang="ts">
    import GithubIcon from "$lib/icons/github.svelte";
    import LinkedInIcon from '$lib/icons/linkedin.svelte';
</script>

<nav data-link-type="socials" aria-label="social media links">
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

<style>
    :global(.social-icon) {
        fill:var(--clr-text);     
        height:var(--spacing-block-1);   
    }

    :global(.social-icon:hover) {
        fill:var(--clr-accent);     
    }

    nav {
        width: fit-content;
    }

    nav ul {
        display: flex;        
        gap: var(--size-2);

        li {
            list-style-type: none;   
            max-height: var(--spacing-block-1);  
        }
    }
</style>