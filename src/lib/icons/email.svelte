<script lang="ts">
  export let height: string | undefined = undefined;
  export let width: string | undefined = undefined;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="1 1 22 22"
  color="currentColor"
  stroke="currentColor"
  fill="none"
  stroke-width="0"
  {width}
  {height}
>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
</svg>