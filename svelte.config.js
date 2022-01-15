import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import presetEnv from 'postcss-preset-env';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
    globalStyle: true,
    sourceMap: true,
    postcss: {      
      plugins: [                
        autoprefixer(),
        presetEnv({          
          features: {
            'nesting-rules': true,
            'custom-properties': true,
            'gap-properties': true,
            'not-pseudo-class': true,
            'custom-media-queries': {
              importFrom: 'src/style/queries.pcss',
            },
          },
        }),
      ],
    },
  }),

	kit: {
		adapter: adapter({
      base: dev ? '' : '',
    }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

    appDir: 'internal',
	}
};

export default config;
