import { WebPlugin } from '@capacitor/core';
export class IamportCapacitorWeb extends WebPlugin {
    startIamportActivity(options) {
        return new Promise(resolve => {
            resolve(options);
        });
    }
}
//# sourceMappingURL=web.js.map