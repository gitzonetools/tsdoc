import * as plugins from './tsdoc.plugins';

export const run = async () => {
  const tsdocCli = new plugins.smartcli.Smartcli();
  tsdocCli.addCommand('typedoc').subscribe(async argvArg => {
    
  });

  tsdocCli.addCommand('mkdocs').subscribe(async argvArg => {

  });

  tsdocCli.standardTask().subscribe(async argvArg => {

  })
}