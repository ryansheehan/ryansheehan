<script lang="ts">
  import {summary} from '$lib/resume/summary';
</script>

<section>
  <p class="text-md">{summary}</p>
</section>

<style lang="postcss">
  section {
    color: var(--text-dark-medium);
    background-color: hsl(var(--hsl-gray-300));
    padding: 24px 24px;
    border-radius: 24px;    
  }
  
  p {
    font-style: italic;    

    &:before {
      content: open-quote;
    }

    &:after {
      content: close-quote;
      margin-left: -2px;
    }
  }
</style>