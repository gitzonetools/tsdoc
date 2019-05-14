import * as plugins from './tsdoc.plugins';
import { logger } from './tsdoc.logging';

export const run = async () => {
  const tsdocCli = new plugins.smartcli.Smartcli();
  tsdocCli.addCommand('typedoc').subscribe(async argvArg => {});

  tsdocCli.addCommand('mkdocs').subscribe(async argvArg => {});

  tsdocCli.standardTask().subscribe(async argvArg => {
    logger.log('warn', `Auto detecting environment!`);
  });

  tsdocCli.startParse();
};
