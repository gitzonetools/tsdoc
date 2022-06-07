import * as plugins from './tsdoc.plugins.js';
import * as paths from './tsdoc.paths.js';
import { logger } from './tsdoc.logging.js';

import { TypeDoc } from './tsdoc.classes.typedoc.js';

export const run = async () => {
  const tsdocCli = new plugins.smartcli.Smartcli();

  tsdocCli.standardTask().subscribe(async (argvArg) => {
    logger.log('warn', `Auto detecting environment!`);
    switch (true) {
      case await TypeDoc.isTypeDocDir(paths.cwd):
        logger.log('ok', `Detected TypeDoc compliant directory at ${paths.cwd}`);
        tsdocCli.trigger('typedoc');
        break;
      default:
        logger.log('error', `Cannot determine docs format at ${paths.cwd}`);
    }
  });

  tsdocCli.addCommand('typedoc').subscribe(async (argvArg) => {
    const typeDocInstance = new TypeDoc(paths.cwd);
    await typeDocInstance.compile({
      publicSubdir: argvArg.publicSubdir,
    });
  });

  tsdocCli.addCommand('test').subscribe((argvArg) => {
    tsdocCli.trigger('typedoc');
    process.on('exit', async () => {
      await plugins.smartfile.fs.remove(paths.publicDir);
    });
  });

  tsdocCli.startParse();
};
