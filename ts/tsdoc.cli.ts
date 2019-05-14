import * as plugins from './tsdoc.plugins';
import * as paths from './tsdoc.paths';
import { logger } from './tsdoc.logging';

import { TypeDoc } from './tsdoc.classes.typedoc';
import { MkDocs } from './tsdoc.classes.mkdocs';

export const run = async () => {
  const tsdocCli = new plugins.smartcli.Smartcli();
  tsdocCli.addCommand('typedoc').subscribe(async argvArg => {

  });

  tsdocCli.addCommand('mkdocs').subscribe(async argvArg => {});

  tsdocCli.standardTask().subscribe(async argvArg => {
    logger.log('warn', `Auto detecting environment!`);
    switch (true) {
      case await TypeDoc.isTypeDocDir(paths.cwd):
        logger.log('ok', `Detected TypeDoc compliant directory at ${paths.cwd}`);
        tsdocCli.trigger('typedoc');
        const typeDocInstance = new TypeDoc(paths.cwd);
        await typeDocInstance.compile();
        break;
      case await MkDocs.isMkDocsDir(paths.cwd):
      logger.log('ok', `Detected MkDocs compliant directory at ${paths.cwd}`);
        break;
      default:
        logger.log('error', `Cannot determine docs format at ${paths.cwd}`);
    }
  });

  tsdocCli.startParse();
};
