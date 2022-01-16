import { writable } from 'svelte/store';

const isWindowDefined = typeof window !== 'undefined';

function createMediaStore(query: string) {
  const store = writable(false, set => {
    if (isWindowDefined) {
      const {set: setValue} = store;
      const mql = window.matchMedia(query);
      set(mql.matches);
      const handler = ({matches}: {matches: boolean}) => setValue(matches);
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
  });
  return {subscribe: store.subscribe};
}

// Media queries must match src/style/media.pcss
export const isMobile = createMediaStore('not (min-width: 34.375rem)');
export const tabletAndLarger = createMediaStore('(min-width: 34.375rem)');
export const laptopAndLarger = createMediaStore('(min-width: 68.75rem)');
export const desktopAndLarger = createMediaStore('(min-width: 93.75rem)');
