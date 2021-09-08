import { registerPlugin } from '@capacitor/core';

import type { IamportCapacitorPlugin } from './definitions';

const IamportCapacitor = registerPlugin<IamportCapacitorPlugin>(
  'IamportCapacitor',
  {
    web: () => import('./web').then(m => new m.IamportCapacitorWeb()),
  },
);

export * from './definitions';
export { IamportCapacitor };
