import * as plugins from './tsdoc.plugins';

export const packageDir = plugins.path.join(__dirname, '../');
export const cwd = process.cwd();
export const binDir = plugins.path.join(packageDir, './node_modules/.bin');
