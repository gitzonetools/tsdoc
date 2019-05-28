import * as plugins from './tsdoc.plugins';

// dirs
export const packageDir = plugins.path.join(__dirname, '../');
export const cwd = process.cwd();
export const binDir = plugins.path.join(packageDir, './node_modules/.bin');
export const assetsDir = plugins.path.join(packageDir, './assets');
export const publicDir = plugins.path.join(packageDir, './public');

// files
export const tsconfigFile = plugins.path.join(assetsDir, './tsconfig.json');
