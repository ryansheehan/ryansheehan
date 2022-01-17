import { writable } from 'svelte/store';
import type {Readable} from 'svelte/store';

export interface Modal extends Readable<boolean> {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export function createModal(): Modal {
  const {subscribe, update, set} = writable(false);
  return {
    subscribe,
    toggle: () => update(v => !v),
    open: () => set(true),
    close: () => set(false),
  }
}

export const emailModal = createModal();

