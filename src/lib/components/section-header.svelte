<div class="wrapper">
  <h5 class="header"><slot/></h5>
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
  }
  
  hr {
    margin-bottom: 8px;
  }
</style>