import * as early from '@pushrocks/early';
early.start('tsdoc');
import * as plugins from './tsdoc.plugins.js';
import * as cli from './tsdoc.cli.js';
early.stop();

export const runCli = async () => {
  await cli.run();
};
