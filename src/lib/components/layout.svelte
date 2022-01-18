<script lang="ts">
</script>

<header><slot name="header"/></header>
<main><slot name="content"/></main>
<footer><slot name="footer"/></footer>

<style lang="postcss">
  header {
    flex: none;
    display: fixed;
    width: 100%;
    top: 0;   
    margin-bottom: 16px;         
  }  

  main {
    flex: 1 1 auto;

    margin-bottom: 48px;

    @media screen and (--tablet-and-larger) {
      margin-bottom: 0;
    }
  }

  footer {
    flex: none;
    text-align: center;
    background-color: hsl(var(--hsl-gray-900));
    width: 100%;

    padding: 8px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    @media screen and (--tablet-and-larger) {
      padding: 0;
      position: revert;
      bottom: revert;
      left: revert;
      transform: none;
    }
  }
</style>