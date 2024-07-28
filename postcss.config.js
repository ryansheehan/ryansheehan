import postcssPresetEnv from 'postcss-preset-env';
import postcssCustomMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';

/**
 * @typedef {import('postcss-load-config').ConfigFn} ConfigFn
 */

export default ({ env }) => ({
    plugins: [
        postcssGlobalData({
            files: [
                './src/styles/base/media.css',
            ]
        }),
        
        postcssCustomMedia({
            
        }),

        postcssPresetEnv({

        }),
    ],
});