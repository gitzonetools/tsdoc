import * as plugins from './tsdoc.plugins.js';
import * as paths from './tsdoc.paths.js';

export class TypeDoc {
  public smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash',
    pathDirectories: [paths.binDir],
  });

  // Static
  public static async isTypeDocDir(dirPathArg: string): Promise<boolean> {
    return true;
  }

  // Instance
  public typedocDirectory: string;
  constructor(dirPathArg) {
    this.typedocDirectory = dirPathArg;
  }

  public async compile(options?: { publicSubdir?: string }) {
    const data = {
      compilerOptions: {
        "experimentalDecorators": true,
        "useDefineForClassFields": false,
        "target": "ES2022",
        "module": "ES2022",
        "moduleResolution": "nodenext",
        "skipLibCheck": true
      },
      include: [],
    };
    let startDirectory = '';
    if (plugins.smartfile.fs.isDirectory(plugins.path.join(paths.cwd, './ts'))) {
      data.include.push(plugins.path.join(paths.cwd, './ts/**/*'));
      startDirectory = 'ts';
    }

    if (plugins.smartfile.fs.isDirectory(plugins.path.join(paths.cwd, './ts_web'))) {
      data.include.push(plugins.path.join(paths.cwd, './ts_web/**/*'));
      if (!startDirectory) {
        startDirectory = 'ts_web';
      }
    }

    await plugins.smartfile.memory.toFs(JSON.stringify(data), paths.tsconfigFile);
    let targetDir = paths.publicDir;
    if (options?.publicSubdir) {
      targetDir = plugins.path.join(targetDir, options.publicSubdir);
    }
    await this.smartshellInstance.exec(
      `typedoc --tsconfig ${paths.tsconfigFile} --out ${targetDir} ${startDirectory}/index.ts`
    );
    plugins.smartfile.fs.remove(paths.tsconfigFile);
  }
}
