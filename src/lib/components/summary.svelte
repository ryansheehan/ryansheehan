<script lang="ts">
  const years = (new Date()).getFullYear() - 2008;
</script>

<section>
  <p class="text-md">Software engineering leader with {years} years of experience building complex
  applications on a wide variety of platforms. Experienced in leading large
  organizations in their transition to being a cloud based company. Passionate
  about delivering an intuitive and high quality end-user experience.</p>
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
    }
  }
</style>