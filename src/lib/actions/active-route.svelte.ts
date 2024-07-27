import {page} from '$app/stores';
import type {Action} from 'svelte/action';

export const activeRoute: Action<HTMLAnchorElement> = (node) => {
    const {pathname: nodePath} = new URL(node.href);        
    const unsubscribe = page.subscribe(({url}) => {
        const {pathname: activePath} = url;        
        const selected = nodePath === activePath;
        node.classList.toggle('active', selected);
        node.setAttribute('aria-selected', selected.toString());
    });    

    return {
        destroy() {
            unsubscribe();
        }
    }
}
