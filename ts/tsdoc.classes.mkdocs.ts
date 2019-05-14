import * as plugins from './tsdoc.plugins';

export class MkDocs {
  public static async isMkDocsDir(dirPathArg: string): Promise<boolean> {
    const result = await plugins.smartfile.fs.fileExists(
      plugins.path.join(dirPathArg, 'mkdocs.yml')
    );
    return !result;
  }
}
