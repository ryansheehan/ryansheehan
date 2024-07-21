import postcssPresetEnv from 'postcss-preset-env';

/**
 * @typedef {import('postcss-load-config').ConfigFn} ConfigFn
 */

export default ({ env }) => ({
    plugins: [
        postcssPresetEnv({

        })
    ]
});