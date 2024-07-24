import {page} from '$app/stores';
import type {Action} from 'svelte/action';

export const activeRoute: Action<HTMLAnchorElement> = (node) => {
    const {pathname: nodePath} = new URL(node.href);        
    const unsubscribe = page.subscribe(({url}) => {
        const {pathname: activePath} = url;        
        node.classList.toggle('active', nodePath === activePath);
    });    

    return {
        destroy() {
            unsubscribe();
        }
    }
}
