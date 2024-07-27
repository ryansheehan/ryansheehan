import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function crossOriginIsolationMiddleware(_: any, response: any, next: any) {
    response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    response.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
}

const crossOriginIsolation = {
    name: 'cross-origin-isolation',
    configureServer: (server: any) => { server.middlewares.use(crossOriginIsolationMiddleware); },
    configurePreviewServer: (server: any) => { server.middlewares.use(crossOriginIsolationMiddleware); },
};

export default defineConfig({
	plugins: [sveltekit(), crossOriginIsolation],
	// server: {
	// 	headers: {
	// 		'Cross-Origin-Opener-Policy': 'same-origin',
	// 		'Cross-Origin-Embedder-Policy': 'require-corp'
	// 	}
	// }
});
