import type {SvelteComponent} from 'svelte'
import { writable } from 'svelte/store';
import type {Readable} from 'svelte/store';

export interface ModalContent {
  open: boolean;
  component?: typeof SvelteComponent;
  data?: object;
}

export interface Modal extends Readable<ModalContent> {  
  open: (component: typeof SvelteComponent, data?: object) => void;
  close: () => void;
}

export function createModal(): Modal {
  const {subscribe, set} = writable<ModalContent>({
    open: false,

  });
  return {
    subscribe,
    open: (component: typeof SvelteComponent, data?: object) => {      
      set({open: true, component, data: data ||{}});
    },
    close: () => set({open: false}),
  }
}

export const modal = createModal();