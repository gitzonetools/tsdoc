import { expect, tap } from '@pushrocks/tapbundle';
import * as tsdoc from '../ts/index'

tap.test('first test', async () => {
  console.log(tsdoc.standardExport)
})

tap.start()
