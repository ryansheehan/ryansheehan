import { writable } from 'svelte/store';
import type {Readable} from 'svelte/store';

export interface Modal extends Readable<boolean> {  
  open: () => void;
  close: () => void;
}

export function createModal(): Modal {
  const {subscribe, set} = writable(false);
  return {
    subscribe,
    open: () => set(true),
    close: () => set(false),
  }
}

export const emailModal = createModal();