import * as plugins from './tsdoc.plugins';
import * as paths from './tsdoc.paths';

export class TypeDoc {
  public smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash',
    pathDirectories: [paths.binDir]
  });

  // Static
  public static async isTypeDocDir(dirPathArg: string): Promise<boolean> {
    const result = await plugins.smartfile.fs.fileExists(
      plugins.path.join(dirPathArg, 'mkdocs.yml')
    );
    return !result;
  }

  // Instance
  public typedocDirectory: string;
  constructor(dirPathArg) {
    this.typedocDirectory = dirPathArg; 
  }

  public async compile () {
    await this.smartshellInstance.exec(`typedoc --module "commonjs" --target "ES2016" --out public/ ts/`);
  }
}
