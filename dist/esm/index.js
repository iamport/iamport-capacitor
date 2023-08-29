import { registerPlugin } from '@capacitor/core';
const IamportCapacitor = registerPlugin('IamportCapacitor', {
    web: () => import('./web').then(m => new m.IamportCapacitorWeb()),
});
export * from './definitions';
export * from './plugin';
export { IamportCapacitor };
//# sourceMappingURL=index.js.map