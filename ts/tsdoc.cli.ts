import * as plugins from './tsdoc.plugins';
import * as paths from './tsdoc.paths';
import { logger } from './tsdoc.logging';

import { TypeDoc } from './tsdoc.classes.typedoc';
import { MkDocs } from './tsdoc.classes.mkdocs';
import { TsDoc } from './tsdoc.classes.tsdoc';

export const run = async () => {
  const tsdocCli = new plugins.smartcli.Smartcli();

  tsdocCli.standardTask().subscribe(async argvArg => {
    const tsdoc = new TsDoc(paths.cwd);
    await tsdoc.buildDirectory();
  });

  tsdocCli.addCommand('mkdocs').subscribe(async argvArg => {
    await MkDocs.handleCommand(argvArg);
  });

  tsdocCli.addCommand('test').subscribe(argvArg => {
    process.on('exit', async () => {
      await plugins.smartfile.fs.remove(paths.publicDir);
    });
  });

  tsdocCli.startParse();
};
