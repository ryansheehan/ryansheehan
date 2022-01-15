<script lang="ts">
  export let header: string;
</script>

<section>
  <div class="header-wrapper">
    <h2 class="header text-2xl">{header}</h2>
    <span class="spacer"></span>
    <slot name="options"/>
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
    margin-bottom: 8px;
  }
</style>