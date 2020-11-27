import * as plugins from './tsdoc.plugins';
import * as paths from './tsdoc.paths';

export class TypeDoc {
  public smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash',
    pathDirectories: [paths.binDir],
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

  public async compile(options?: {
    publicSubdir?: string;
  }) {
    const data = {
      compilerOptions: {
        target: 'es2017',
        module: 'commonjs',
        esModuleInterop: true,
        experimentalDecorators: true,
      },
      include: [],
    };
    data.include = [plugins.path.join(paths.cwd, './ts/**/*')];
    await plugins.smartfile.memory.toFs(JSON.stringify(data), paths.tsconfigFile);
    let targetDir = paths.publicDir;
    if (options?.publicSubdir) {
      targetDir = plugins.path.join(targetDir, options.publicSubdir);
    }
    await this.smartshellInstance.exec(
      `typedoc --tsconfig ${paths.tsconfigFile} --out ${paths.publicDir}`
    );
    plugins.smartfile.fs.remove(paths.tsconfigFile);
  }
}
