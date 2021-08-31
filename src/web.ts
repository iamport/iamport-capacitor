import { WebPlugin } from '@capacitor/core';

import type { IamportCapacitorPlugin } from './definitions';

export class IamportCapacitorWeb
  extends WebPlugin
  implements IamportCapacitorPlugin {
  startIamportActivity(options: any): Promise<any> {
    return new Promise(resolve => {
      resolve(options);
    });
  }
}
