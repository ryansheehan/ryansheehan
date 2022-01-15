<script lang="ts">
  import Socials from '$lib/components/socials.svelte';
</script>

<div class="header-content">
  <img src="https://www.gravatar.com/avatar/559b2e9fe5620de0994a0de5180cd6eb" alt="Ryan Sheehan" />
  <a class="color-blue--hover glow--hover" href="/"><h1>Ryan Sheehan</h1></a>
  <Socials/>
</div>
<hr/>

<style lang="postcss">
  .header-content {    
    display: flex;
    flex-flow: row wrap;
    align-items: center;          
  }

  h1 {
    padding-left: 16px;
    white-space: nowrap;
    font-size: var(--font-size-x3l);
    line-height: var(--line-height-x3l);
  } 

  img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    filter: grayscale(100%);
    transition: 1s;

    &:hover {
      filter: none;
    }
  }

  hr {
    margin-top: 8px;
  }
</style>