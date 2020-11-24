import * as plugins from './tsdoc.plugins';

// dirs
export const packageDir = plugins.path.join(__dirname, '../');
export const cwd = process.cwd();
export const binDir = plugins.path.join(packageDir, './node_modules/.bin');
export const assetsDir = plugins.path.join(packageDir, './assets');
export const publicDir = plugins.path.join(cwd, './public');
export const tsDir = plugins.path.join(cwd, './ts');

// files
export const tsconfigFile = plugins.path.join(assetsDir, './tsconfig.json');
export const typedocOptionsFile = plugins.path.join(assetsDir, './typedoc.json');
