<div class="wrapper">
  <h2 class="header text-2xl"><slot/></h2>
  <span class="spacer"></span>
  <slot name="options"/>
</div>
<hr/>

<style lang="postcss">
  .spacer {
    flex: 1 1 0px;
  }

  .header {
    margin-right: auto;
  }

  .wrapper {
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;
  }
  
  hr {
    margin-bottom: 8px;
  }
</style>