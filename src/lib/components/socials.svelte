<script lang="ts">
    import GithubIcon from "$lib/icons/github.svelte";
    import LinkedInIcon from '$lib/icons/linkedin.svelte';
    import EmailIcon from '$lib/icons/email.svelte';
</script>

<nav data-link-type="socials" aria-label="social media links">
    <menu>
        <li>
            <a href="mailto:rsheehan@gmail.com">
                <EmailIcon class="social-icon email"/>
                <span class="sr-only">email me</span>
            </a>
        </li>
        <li>
            <a href="https://github.com/ryansheehan/">
                <GithubIcon class="social-icon github"/>
                <span class="sr-only">Github</span>
            </a>
        </li>
        <li>
            <a href="https://www.linkedin.com/in/sheehanr/">
                <LinkedInIcon class="social-icon linkedin"/>
                <span class="sr-only">LinkedIn</span>
            </a>
        </li>
    </menu>                
</nav>

<style>
    :global(.social-icon) {
        fill:var(--clr-text);     
        height:var(--spacing-block-1);   
    }

    :global(.social-icon:hover) {
        fill:var(--clr-primary);     
    }

    nav {
        width: fit-content;
    }

    nav menu {
        display: flex;        
        gap: var(--size-2);

        li {
            list-style-type: none;   
            max-height: var(--spacing-block-1);  
        }
    }
</style>