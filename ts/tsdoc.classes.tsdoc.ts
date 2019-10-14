import * as plugins from './tsdoc.plugins';
import { MkDocs } from './tsdoc.classes.mkdocs';
import { TypeDoc } from './tsdoc.classes.typedoc';
import { logger } from './tsdoc.logging';

export type TDirectoryType = 'mkdocs' | 'typedoc';

export class TsDoc {
  public smartshellInstance = new plugins.smartshell.Smartshell({
    executor: 'bash'
  });
  
  public mkdocs: MkDocs;
  public typedoc: TypeDoc;

  public cwd: string;
  public cwdDirType: TDirectoryType;

  constructor(cwdArg: string) {
    this.cwd = cwdArg;
    this.mkdocs = new MkDocs(this.cwd);
    this.typedoc = new TypeDoc(this.cwd);
  }

  public async buildDirectory() {
    await this.detectDirectoryType();
    if (this.cwdDirType === 'mkdocs') {
      await this.mkdocs.compile();
    } else if (this.cwdDirType === 'typedoc') {
      await this.typedoc.compile();
    }
    await this.runAdditionalTasks();
  }

  private async detectDirectoryType () {
    logger.log('warn', `Auto detecting environment!`);
    switch (true) {
      case await TypeDoc.isTypeDocDir(this.cwd):
        logger.log('ok', `Detected TypeDoc compliant directory at ${this.cwd}`);
        this.cwdDirType = 'typedoc';
        break;
      case await MkDocs.isMkDocsDir(this.cwd):
        logger.log('ok', `Detected MkDocs compliant directory at ${this.cwd}`);
        this.cwdDirType = 'mkdocs';
        break;
      default:
        logger.log('error', `Cannot determine docs format at ${this.cwd}`);
    }


  }

  /**
   * runs additional tasks from package.json
   */
  public runAdditionalTasks() {
    const packageJson = plugins.smartfile.fs.toObjectSync(plugins.path.join(this.cwd, 'package.json'));
    if (packageJson.scripts.tsdoc) {
      this.smartshellInstance.exec('npm run tsdoc');
    }
  }
}
