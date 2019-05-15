import * as plugins from './tsdoc.plugins';
import * as paths from './tsdoc.paths';

export class MkDocs {
  public smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash',
    pathDirectories: [paths.binDir]
  });

  public static async isMkDocsDir(dirPathArg: string): Promise<boolean> {
    const result = await plugins.smartfile.fs.fileExists(
      plugins.path.join(dirPathArg, 'mkdocs.yml')
    );
    return result;
  }

  public static async handleCommand(argvArg) {
    const mkdocsInstance = new MkDocs(paths.cwd);
    switch (true) {
      case argvArg.serve:
        await mkdocsInstance.serve();
        break;
        case argvArg.publish:
        await mkdocsInstance.publish();
        break;
      default:
        await mkdocsInstance.compile();
        break;
    }
  }

  // Instance
  public typedocDirectory: string;
  constructor(dirPathArg) {
    this.typedocDirectory = dirPathArg;
  }

  public async update() {
    await this.smartshellInstance.exec(
      `docker pull registry.gitlab.com/hosttoday/ht-docker-mkdocs`
    );
  }

  public async compile() {
    await this.update();
    await this.smartshellInstance.exec(`rm -rf public/`);
    await this.smartshellInstance.exec(
      `docker run --rm -it -p 8000:8000 -v ${
        paths.cwd
      }:/docs registry.gitlab.com/hosttoday/ht-docker-mkdocs build`
    );
    await this.smartshellInstance.exec(`gitzone commit`);
  }

  public async serve() {
    await this.update();
    await this.smartshellInstance.exec(
      `docker run --rm -it -p 8000:8000 -v ${
        paths.cwd
      }:/docs registry.gitlab.com/hosttoday/ht-docker-mkdocs`
    );
  }

  public async publish() {
    await this.compile();
    await this.smartshellInstance.exec(`gitzone commit`);
  }
}
