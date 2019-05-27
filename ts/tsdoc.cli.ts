import * as plugins from './tsdoc.plugins';
import * as paths from './tsdoc.paths';
import { logger } from './tsdoc.logging';

import { TypeDoc } from './tsdoc.classes.typedoc';
import { MkDocs } from './tsdoc.classes.mkdocs';

export const run = async () => {
  const tsdocCli = new plugins.smartcli.Smartcli();
  tsdocCli.addCommand('typedoc').subscribe(async argvArg => {
    const typeDocInstance = new TypeDoc(paths.cwd);
    await typeDocInstance.compile();
  });

  tsdocCli.addCommand('mkdocs').subscribe(async argvArg => {
    await MkDocs.handleCommand(argvArg);
  });

  tsdocCli.standardTask().subscribe(async argvArg => {
    logger.log('warn', `Auto detecting environment!`);
    switch (true) {
      case await TypeDoc.isTypeDocDir(paths.cwd):
        logger.log('ok', `Detected TypeDoc compliant directory at ${paths.cwd}`);
        tsdocCli.trigger('typedoc');
        break;
      case await MkDocs.isMkDocsDir(paths.cwd):
        logger.log('ok', `Detected MkDocs compliant directory at ${paths.cwd}`);
        tsdocCli.trigger('mkdocs');
        break;
      default:
        logger.log('error', `Cannot determine docs format at ${paths.cwd}`);
    }
  });

  tsdocCli.addCommand('test').subscribe(argvArg => {
    tsdocCli.trigger('typedoc');
    process.on('exit', async () => {
      await plugins.smartfile.fs.remove(paths.publicDir);
    });
  });

  tsdocCli.startParse();
};
