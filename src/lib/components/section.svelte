<script lang="ts">
  export let header: string;
</script>

<section>
  <div class="container">
    <div class="header-wrapper">
      <h2 class="header text-2xl">{header}</h2>
      <span class="spacer"></span>    
    </div>
    <div class="options-wrapper">
      <slot name="options"/>
    </div>
  </div>
  <slot />
</section>

<style lang="postcss">
  .spacer {
    flex: 1 1 0px;
  }

  .header {
    margin-right: auto;
  }

  .header-wrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;
    border-bottom: 1px solid;
    padding-bottom: 2px;    
  }

  .options-wrapper {
    display: flex;
    justify-content: flex-start;
    padding: 2px;
    margin-bottom: 8px;
  }

  @media screen and (--tablet-and-larger) {
    .header-wrapper {
      margin-bottom: 0px;
      border-bottom: none;
      margin-right: auto;
    }

    .options-wrapper {
      padding-bottom: 0px;           
    }

    .container {
      display: flex;
      border-bottom: 1px solid;
      align-items: baseline;
      margin-bottom: 8px; 
    }
  }
</style>