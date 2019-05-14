import * as early from '@pushrocks/early';
early.start('tsdoc');
import * as plugins from './tsdoc.plugins';
import * as cli from './tsdoc.cli';
early.stop();
cli.run();
