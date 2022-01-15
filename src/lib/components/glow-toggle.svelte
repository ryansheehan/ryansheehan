<script lang="ts">
  import type { Color } from '$lib/constants';

  export let label: string;
  export let color: Color;  
  export let checked = false;
</script>

<label for={label} class="glow {checked ? `color-${color} selected` : ''}">{label}</label>
<input id={label} type="checkbox" class="visually-hidden" bind:checked={checked}>

<style lang="postcss">
  .selected {
    opacity: 1;
    text-decoration: underline;
  }

  label {
    opacity: 0.8;
    transition: 0.3s;

    @media screen and  (--tablet-and-larger) {
      cursor: pointer;
    }

    @media screen and  (--laptop-and-larger) {      
      &:hover {
        opacity: 1;
        text-decoration: underline;
      }
    }
  }
</style>